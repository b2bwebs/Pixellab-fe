import DataTable from '@/components/DataTable';
import Btn from '@/components/Forms/Btn';
import Search from '@/components/Forms/Search';
import IconPencil from '@/components/Icon/IconPencil';
import { SERVICE } from '@/constants/services';
import { useActionCall, useGetCall, useQueryParams } from '@/hooks';
import { useEffect, useState } from 'react';
import { MODAL_OPEN } from '@/constants/others';
import Swal from 'sweetalert2';
import IconTrash from '@/components/Icon/IconTrash';
import Lib from '@/utils/Lib';
import ClientFormModal from './ClientFormModal';
import UIHelpers from '@/utils/UIhelper';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const TABLE_FILTER: any = [];
const MAX_CHAR_LIMIT = 20;
const Clientspage = () => {
    const [copied, setCopied] = useState<string | null>(null);
    const Columns: any = [
        {
            title: 'ID',
            key: 'id',
        },
        {
            title: 'User Email',
            key: 'user_email',
            render: (index: number, row: any) => <div>{row.user?.email ?? '-'}</div>,
        },
        {
            title: 'Company Name',
            key: 'company_name',
        },
        {
            title: 'Address',
            key: 'address',
        },
        {
            title: 'Contact No',
            key: 'contact_no',
        },
        {
            title: 'Secondary Mobile',
            key: 'sec_mobile',
        },
        {
            title: 'GST No',
            key: 'gst_no',
        },
        {
            title: 'Allowed Origins',
            key: 'allowed_origins',
            render: (index: number, row: any) => (
                <div>
                    {Array.isArray(row.allowed_origins) && row.allowed_origins.length > 0
                        ? row.allowed_origins.map((originObj: any) => originObj.origin).join(', ')
                        : '-'}
                </div>
            ),
        },
        {
            title: 'Is Active',
            key: 'is_active',
            render: (index: number, row: any) => <div>{row.is_active ? 'Active' : 'Inactive'}</div>,
        },
        {
            title: 'Default Max Pages',
            key: 'default_max_pages',
        },
        {
            title: 'AI Config',
            key: 'ai_config',
            render: (index: number, row: any) => (
                <div>
                    {Array.isArray(row.ai_config) && row.ai_config.length > 0
                        ? row.ai_config.map((config: any, idx: number) => (
                              <div key={idx}>
                                  <span>
                                      {config.file_pages ?? '-'}: {config.max_final_pages ?? '-'}
                                  </span>
                              </div>
                          ))
                        : '-'}
                </div>
            ),
        },

        {
            title: 'Created At',
            key: 'created_at',
            render: (index: number, row: any) => <div>{UIHelpers.DateFormat(row.created_at)}</div>,
        },
        {
            title: 'Client ID',
            key: 'current_client_id',
            render: (index: number, row: any) => {
                const text = row.current_client_id ?? '-';
                const isTruncated = text.length > MAX_CHAR_LIMIT;
                const displayText = isTruncated ? text.slice(0, MAX_CHAR_LIMIT) + '...' : text;
                return (
                    <div className="flex items-center gap-2">
                        <span title={text} className="font-mono">
                            {displayText}
                        </span>
                        {text !== '-' && (
                            <CopyToClipboard
                                text={text}
                                onCopy={() => {
                                    setCopied(text);
                                    setTimeout(() => setCopied(null), 2000);
                                }}
                            >
                                <button className="text-blue-600 hover:text-blue-800 text-sm">Copy</button>
                            </CopyToClipboard>
                        )}
                        {copied === text && <span className="text-green-600 text-xs ml-1">Copied!</span>}
                        {isTruncated && (
                            <small className="text-gray-500 text-xs ml-1">
                                ({text.length}/{MAX_CHAR_LIMIT} chars)
                            </small>
                        )}
                    </div>
                );
            },
        },
        {
            title: 'Client Secret',
            key: 'current_client_secret',
            render: (index: number, row: any) => {
                const text = row.current_client_secret ?? '-';
                const isTruncated = text.length > MAX_CHAR_LIMIT;
                const displayText = isTruncated ? text.slice(0, MAX_CHAR_LIMIT) + '...' : text;
                return (
                    <div className="flex items-center gap-2">
                        <span title={text} className="font-mono">
                            {displayText}
                        </span>
                        {text !== '-' && (
                            <CopyToClipboard
                                text={text}
                                onCopy={() => {
                                    setCopied(text);
                                    setTimeout(() => setCopied(null), 2000);
                                }}
                            >
                                <button className="text-blue-600 hover:text-blue-800 text-sm">Copy</button>
                            </CopyToClipboard>
                        )}
                        {copied === text && <span className="text-green-600 text-xs ml-1">Copied!</span>}
                        {isTruncated && (
                            <small className="text-gray-500 text-xs ml-1">
                                ({text.length}/{MAX_CHAR_LIMIT} chars)
                            </small>
                        )}
                    </div>
                );
            },
        },
        {
            title: 'Action',
            key: 'id',
            render: (value: string) => (
                <div>
                    <button
                        type="button"
                        className="mx-1"
                        onClick={() => updateSearchParam({ options: { Modal: MODAL_OPEN.CLIENTS_MODAL, Edit: value } })}
                    >
                        <IconPencil />
                    </button>
                    <button type="button" className="mx-1" onClick={() => ConfirmDeleteModal(value)}>
                        <IconTrash fill={true} />
                    </button>
                </div>
            ),
        },
    ];

    const { extractFilterOnQuery, updateSearchParam, searchParams } = useQueryParams();
    const Modal = searchParams.get('Modal') || undefined;

    const [filter, setFilter] = useState({
        filter: extractFilterOnQuery(TABLE_FILTER),
        pageNo: 1,
        pageSize: 10,
        sortDir: '',
        sortBy: '',
        search: '',
    });

    const { loading, setQuery, data } = useGetCall(SERVICE.CLIENTS, { avoidFetch: true });
    // console.log('API data:', data);

    const { loading: deleteLoading, Delete: DeleteBlog } = useActionCall(SERVICE.CLIENTS);
    const BlogAPI = () => {
        setQuery(filter);
    };
    useEffect(() => {
        BlogAPI();
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

    const ConfirmDeleteModal = async (value: string) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-secondary',
                cancelButton: 'btn btn-dark ltr:mr-3 rtl:ml-3',
                popup: 'sweet-alerts',
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons
            .fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true,
                padding: '2em',
            })
            .then(async (result) => {
                if (result.value) {
                    let resp = await DeleteBlog(value);
                    if (resp) {
                        BlogAPI();
                    }
                }
            });
    };

    return (
        <div>
            <div>
                <div className="pb-0 flex sm:flex-row flex-col w-full sm:items-center gap-4">
                    <div className=" prose ">
                        <h3 className="m-0 dark:text-white-dark flex">
                            <IconPencil className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0 my-auto" />
                            <span className="my-auto"> Clients</span>
                        </h3>
                    </div>
                    <div className="flex items-center justify-center sm:justify-end sm:flex-auto flex-1">
                        <Btn
                            className="mx-2"
                            icon="plus"
                            title="Add Client"
                            type="button"
                            size={'wAuto'}
                            onClick={() => updateSearchParam({ options: { Modal: MODAL_OPEN.CLIENTS_MODAL } })}
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
                    <div className="flex items-center justify-center sm:justify-end sm:flex-auto flex-1"></div>
                </div>
                <DataTable
                    columns={Columns}
                    data={data?.results ?? []}
                    pageSize={filter.pageSize}
                    currentPage={filter.pageNo}
                    totalRecords={data?.count ?? 0}
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
            {Modal == MODAL_OPEN.CLIENTS_MODAL && <ClientFormModal recoilApi={BlogAPI} />}
        </div>
    );
};

export default Clientspage;
