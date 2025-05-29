import { useQueryParams } from '@/hooks';
import Lib from '@/utils/Lib';
import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

export default function AuthWrapper() {
    const { navigate, pathname } = useQueryParams();

    useEffect(() => {
        const authToken = Lib.getCookies('session-token');
        if (!authToken) {
            navigate.replace('/login');
        }
    }, [pathname]);

    return (
        <>
            <Outlet />
        </>
    );
}
