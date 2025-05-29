import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { BASE_URL, SERVICE } from '@/constants/services';
import useQueryParams from './useQueryParams';
import Lib from '@/utils/Lib';
import Swal from 'sweetalert2';

interface ActionCallResponse {
    loading: boolean;
    data: any;
    error: any;
    Post: (payload: any, message?: string) => Promise<any>;
    Put: (recordId: string, payload: any, message?: string) => Promise<any>;
    Delete: (recordId: string, message?: string) => Promise<any>;
}

const createHeaders = (authToken?: string | null, isJson = true): HeadersInit => {
    const headers: Record<string, string> = {};
    if (isJson) {
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';
    }
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }
    return headers;
};

const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = Lib.getCookies('refresh-token');
    if (!refreshToken) return null;

    try {
        const response = await fetch(`${BASE_URL}/v1/auth/token/refresh/`, {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) throw new Error('Refresh failed');

        const data = await response.json();
        Lib.setCookies({
            name: 'session-token',
            value: data.access,
            exp: Lib.expiredSec(Lib.DecodeJwt(data.access)?.exp ?? 1),
        });
        Lib.setCookies({
            name: 'refresh-token',
            value: data.refresh,
            exp: Lib.expiredSec(Lib.DecodeJwt(data.refresh)?.exp ?? 1),
        });
        return data.access;
    } catch {
        Lib.removeCookies('session-token');
        Lib.removeCookies('refresh-token');
        return null;
    }
};

const useActionCall = (url: string): ActionCallResponse => {
    const { navigate } = useQueryParams();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    const resetStates = () => {
        setLoading(false);
        setError(null);
        setData(null);
    };

    const handleError = async (response: Response, customRedirect = true) => {
        setLoading(false);
        const jData = await response.json();

        switch (response.status) {
            case 401:
                if (customRedirect) {
                    Lib.removeCookies('session-token');
                    navigate.replace('/login');
                }
                toast.error(jData.message || 'Unauthorized');
                return;
            case 400:
                toast.error(jData.message || 'Bad Request');
                return;
            case 422:
                const err: any = {};
                for (const key in jData.errors) {
                    if (jData.errors[key]?.length) {
                        err[key] = jData.errors[key][0];
                    }
                }
                setError(err);
                return;
            case 500:
                throw new Error('Server Error, Please Try Later');
            default:
                throw new Error('Unexpected Error');
        }
    };

    const fetchWithAuth = async (method: string, endpoint: string, payload?: any): Promise<Response> => {
        let authToken = Lib.getCookies('session-token');
        let response = await fetch(endpoint, {
            method,
            headers: createHeaders(authToken),
            body: payload ? JSON.stringify(payload) : undefined,
        });

        if (response.status === 401) {
            // Try token refresh
            const newToken = await refreshAccessToken();
            if (newToken) {
                response = await fetch(endpoint, {
                    method,
                    headers: createHeaders(newToken),
                    body: payload ? JSON.stringify(payload) : undefined,
                });
            }
        }

        return response;
    };

    const Post = useCallback(
        async (payload: any = {}, message = 'Created Successfully') => {
            resetStates();
            setLoading(true);
            try {
                const endpoint = `${BASE_URL}${SERVICE[url] ?? url}`;
                const response = await fetchWithAuth('POST', endpoint, payload);
                if (!response.ok) return await handleError(response);

                const jsonData = await response.json();
                setData(jsonData);
                toast.success(message);
                return jsonData;
            } catch (error: any) {
                toast.error(error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        },
        [url]
    );

    const Put = useCallback(
        async (recordId = '', payload: any = {}, message = 'Updated Successfully') => {
            resetStates();
            setLoading(true);
            try {
                const endpoint = `${BASE_URL}${SERVICE[url] ?? url}${recordId ? `/${recordId}/` : ''}`;
                const response = await fetchWithAuth('PUT', endpoint, payload);
                if (!response.ok) return await handleError(response);

                const jsonData = await response.json();
                setData(jsonData);
                toast.success(message);
                return jsonData;
            } catch (error: any) {
                toast.error(error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        },
        [url]
    );

    const Delete = useCallback(
        async (recordId = '', message = 'Deleted Successfully') => {
            resetStates();
            setLoading(true);
            try {
                const endpoint = `${BASE_URL}${SERVICE[url] ?? url}${recordId ? `/${recordId}` : ''}`;
                const response = await fetchWithAuth('DELETE', endpoint);
                if (!response.ok) return await handleError(response);

                const jsonData = await response.json();
                setData(jsonData);

                Swal.fire({
                    title: 'Deleted!',
                    text: message,
                    icon: 'success',
                    customClass: {
                        confirmButton: 'btn btn-secondary',
                        popup: 'sweet-alerts',
                    },
                    buttonsStyling: false,
                });

                return jsonData;
            } catch (error: any) {
                toast.error(error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        },
        [url]
    );

    return {
        loading,
        data,
        error,
        Post,
        Put,
        Delete,
    };
};

export default useActionCall;
