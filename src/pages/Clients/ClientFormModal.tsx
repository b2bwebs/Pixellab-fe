import { lazy } from 'react';
import ModalTransition from '@/components/ModalTransition';
import { useActionCall, useGetCall, useQueryParams } from '@/hooks';
import { SERVICE } from '@/constants/services';
import { useEffect } from 'react';
import ContainerLoader from '@/components/ContainerLoader';
import Lib from '@/utils/Lib';
const ClientForm = lazy(() => import('./ClientForm'));

const ClientFormModal = ({ recoilApi = () => {} }) => {
    const { searchParams, updateSearchParam } = useQueryParams();
    const Edit = searchParams.get('Edit') || undefined;
    // const { Post, Put, error: RequestError } = useActionCall(SERVICE.CLIENTS_CREATE);
    const { Post: CreateClient, error: createError } = useActionCall(SERVICE.CLIENTS_CREATE);
    const { Put: UpdateClient, error: updateError } = useActionCall(SERVICE.CLIENTS_UPDATE);

    const {
        data,
        loading,
        error: fetchError,
    } = useGetCall(SERVICE.CLIENTS_EDIT, {
        avoidFetch: !Boolean(Edit),
        key: Edit,
    });
    // console.log(data);

    const closeModal = () => {
        updateSearchParam({ deleteParams: ['Modal', 'Edit'] });
    };
    useEffect(() => {
        // Close on any error
        if (fetchError || createError || updateError) {
            closeModal();
        }
    }, [fetchError, createError, updateError]);
    const onCreate = async (payload: any) => {
        let formattedPayload = Lib.payloadFormat(payload, '');
        if (typeof formattedPayload.allowed_origins === 'string') {
            formattedPayload.allowed_origins = formattedPayload.allowed_origins
                .split(',')
                .map((item: string) => item.trim())
                .filter(Boolean);
        }

        const response = await CreateClient(formattedPayload);
        if (response) {
            recoilApi();
            closeModal();
        }
    };

    const onEdit = async (payload: any) => {
        if (!Edit) return;
        let formattedPayload = Lib.payloadFormat(payload, '');
        if (typeof formattedPayload.allowed_origins === 'string') {
            formattedPayload.allowed_origins = formattedPayload.allowed_origins
                .split(',')
                .map((item: string) => item.trim())
                .filter(Boolean);
        }

        const response = await UpdateClient(Edit, formattedPayload);
        if (response) {
            recoilApi();
            closeModal();
        }
    };
    const onAction = Edit ? onEdit : onCreate;
    return (
        <ModalTransition
            title={`${Edit ? 'Update' : 'Create'}`}
            open={true}
            onClose={() => {
                updateSearchParam({ deleteParams: ['Modal', 'Edit'] });
            }}
            size="large"
        >
            {loading ? (
                <ContainerLoader />
            ) : (
                <ClientForm
                    data={data ?? {}}
                    onAction={onAction}
                    RequestError={fetchError || createError || updateError}
                />
            )}
        </ModalTransition>
    );
};

export default ClientFormModal;
