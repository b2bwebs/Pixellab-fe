import DataTable from '@/components/DataTable';
import Search from '@/components/Forms/Search';
import IconPencil from '@/components/Icon/IconPencil';
import TableFilterDrawer from '@/components/TableFilterDrawer';
import { useGetCall, useQueryParams } from '@/hooks';
import { useEffect, useState } from 'react';
import { SERVICE } from '@/constants/services';
import Btn from '@/components/Forms/Btn';
import UIHelpers from '@/utils/UIhelper';

const TABLE_FILTER: any = ['ASSET_CATEGORY', 'USERS'];
const AssetPage = () => {
    const Columns: any = [
        {
            title: 'ID',
            key: '#',
        },
        {
            title: 'Description',
            key: 'description',
        },
        {
            title: 'Category',
            render: (_: string, row: any) => {
                return <span>{row?.category?.category_name}</span>;
            },
        },
        {
            title: 'User Email',
            render: (_: string, row: any) => {
                return <span>{row?.users?.email ?? '-'}</span>;
            },
        },
        {
            title: 'Amount',
            key: 'app_default_currency_amount',
            sortable: true,
            render: (value: any) => {
                return <span>{UIHelpers.amountFormat(value, 'USD', 0)}</span>;
            },
        },
        {
            title: 'Is Insured',
            key: 'is_insured',
            render: (value: any) => {
                return (
                    <>
                        {value == 'Yes' ? (
                            <span className="badge bg-success">Yes</span>
                        ) : (
                            <span className="badge bg-danger">No</span>
                        )}
                    </>
                );
            },
        },
        {
            title: 'Date',
            key: 'asset_date',
            sortable: true,
        },
        {
            title: 'Shared Owner Ship',
            key: 'share_of_your_ownership',
            render: (value: any) => {
                return <>{value ? <span>{value} %</span> : <span>-</span>}</>;
            },
        },
        {
            title: 'Legal Owner',
            key: 'legal_owner_name',
            render: (value: any) => {
                return <>{value ? <span>{value} %</span> : <span>-</span>}</>;
            },
        },
    ];

    const { extractFilterOnQuery } = useQueryParams();

    const [filter, setFilter] = useState({
        filter: extractFilterOnQuery(TABLE_FILTER),
        pageNo: 1,
        pageSize: 10,
        sortDir: '',
        sortBy: '',
        search: '',
    });

    const [open, setOpen] = useState(false);

    const { loading, setQuery, data } = useGetCall(SERVICE.ASSETS, { avoidFetch: true });
    const { loading: loadingExport, fetchApi } = useGetCall(SERVICE.ASSETS, { avoidFetch: true });

    useEffect(() => {
        setQuery(filter);
    }, [filter]);

    const ApplyFilter = (query: any = undefined) => {
        let filter = query ? query : extractFilterOnQuery(TABLE_FILTER);
        setFilter((prv) => ({
            ...prv,
            filter: filter,
            search: prv.search,
            pageNo: 1,
        }));
    };

    const exportExcel = () => {
        fetchApi({ query: { ...filter, exports: true }, exports: true, downloadFilename: 'users-assets.xlsx' });
    };

    return (
        <div>
            <div>
                <div className="pb-0 flex sm:flex-row flex-col w-full sm:items-center gap-4">
                    <div className=" prose ">
                        <h3 className="m-0 dark:text-white-dark flex">
                            <IconPencil className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0 my-auto" />
                            <span className="my-auto"> Asset</span>
                        </h3>

                        <div className="m-0">
                            <ol className="p-0 m-0 list-none flex text-gray-500 font-semibold dark:text-white-dark">
                                <li>
                                    <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">
                                        Dashboard
                                    </button>
                                </li>
                                <li className="before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4">
                                    <button className="text-primary">Asset</button>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className="flex items-center justify-center sm:justify-end sm:flex-auto flex-1">
                        <Btn
                            icon="download"
                            title="Export"
                            uiType={'successOutLine'}
                            isLoading={loadingExport}
                            type="button"
                            size={'wAuto'}
                            onClick={exportExcel}
                        />
                    </div>
                </div>
            </div>
            <div className="panel mt-6">
                <div className="py-4 flex sm:flex-row flex-col w-full sm:items-center gap-4">
                    <div className="ltr:mr-3 rtl:ml-3 flex items-center">
                        <Search
                            value={filter.search}
                            onChange={(e) => setFilter((prv) => ({ ...prv, search: e.target.value }))}
                        />
                    </div>
                    <div className="flex items-center justify-center sm:justify-end sm:flex-auto flex-1">
                        <TableFilterDrawer
                            open={open}
                            onClose={() => setOpen((prv) => !prv)}
                            filters={TABLE_FILTER}
                            setOpen={() => setOpen((prv) => !prv)}
                            onSubmit={ApplyFilter}
                        />
                    </div>
                </div>
                <DataTable
                    columns={Columns}
                    data={data?.data ?? []}
                    pageSize={filter.pageSize}
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
                    setPageSize={(pageSize: number) => {
                        setFilter((prv) => ({ ...prv, pageNo: 1, pageSize: pageSize }));
                    }}
                />
            </div>
        </div>
    );
};

export default AssetPage;
