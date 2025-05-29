import DataTable from '@/components/DataTable';
import { SERVICE } from '@/constants/services';
import { useGetCall, useQueryParams } from '@/hooks';
import moment from 'moment';
import { useEffect, useState } from 'react';

const UserList = () => {
    const Columns: any = [
        {
            title: 'ID',
            key: '#',
        },
        {
            title: 'Name',
            key: 'name',
            sortable: true,
        },
        {
            title: 'Email',
            key: 'email',
            sortable: true,
        },
        {
            title: 'Invite Code',
            key: 'invitation_code',
            render: (_: string, value: any) => {
                return <span>{value?.invitation?.invitation_code ?? '-'}</span>;
            },
        },
        {
            title: 'Last Login',
            key: 'login_time',
            sortable: true,
            render: (index: any, row: any) => (
                <span>{row?.login_time ? moment(row?.login_time).format('YYYY-MM-DD HH:mm a') : '-'}</span>
            ),
        },
        {
            title: 'Login By',
            key: 'login_by',
        },
    ];

    const [filter, setFilter] = useState({
        filter: { is_verified: true },
        pageNo: 1,
        pageSize: 10,
        sortDir: '',
        sortBy: '',
        search: '',
    });

    const { loading, setQuery, data } = useGetCall(SERVICE.USERS, { avoidFetch: true });

    useEffect(() => {
        setQuery(filter);
    }, [filter]);

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h5 className="font-semibold text-lg dark:text-white-light">User List</h5>
            </div>
            <div className="mb-5">
                <div className="max-w-[900px] mx-auto text-center ltr:sm:text-left rtl:sm:text-right space-y-3 sm:space-y-0">
                    <DataTable
                        columns={Columns}
                        data={data?.data ?? []}
                        pageSize={10}
                        currentPage={filter.pageNo}
                        totalRecords={data?.pageInfo?.recordsTotal ?? 0}
                        onPageChange={(page: any) => setFilter((prv) => ({ ...prv, pageNo: page }))}
                        sortBy={filter.sortBy}
                        sortDir={filter.sortDir}
                        setSort={(sortData: any) => {
                            setFilter((prv) => ({ ...prv, sortBy: sortData.key ?? '', sortDir: sortData.sort ?? '' }));
                        }}
                        enableSerial={true}
                        isLoading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserList;
