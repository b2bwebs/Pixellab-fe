import cn from '@/utils/ClassNames';
import RcTable from 'rc-table';
import Pagination, { PageInformation } from '../Pagination';

const classes = {
    table: '[&_.rc-table-content]:overflow-x-auto [&_table]:w-full [&_.rc-table-row:hover]:bg-gray-50 [&_.rc-table-row-expand-icon-cell]:w-14',
    thead: '[&_thead]:text-left [&_thead]:rtl:text-right [&_th.rc-table-cell]:uppercase [&_th.rc-table-cell]:text-xs [&_th.rc-table-cell]:font-semibold [&_th.rc-table-cell]:tracking-wider [&_th.rc-table-cell]:text-gray-500',
    tCell: '[&_.rc-table-cell]:px-3 [&_th.rc-table-cell]:py-3 [&_td.rc-table-cell]:py-4',
    variants: {
        classic:
            '[&_thead]:blueGray-200 [&_.rc-table-container]:border-x [&_.rc-table-container]:border-muted/70 [&_td.rc-table-cell]:border-b [&_td.rc-table-cell]:border-muted/70 [&_thead]:border-y [&_thead]:border-muted/70',
    },
    striped: '[&_.rc-table-row:nth-child(2n)_.rc-table-cell]:bg-gray-100/50 [&_.rc-table-row:hover]:bg-transparent',
};
export default function TableUI({
    columns = [],
    data = [],
    totalRecords,
    pageSize,
    currentPage,
    onPageChange,
    isLoading = false,
    setPageSize = () => {},
}: any) {
    return (
        <div className="relative">
            {isLoading && (
                <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
                    <div className="flex items-center">
                        <svg
                            className="animate-spin h-8 w-8 text-gray-800"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    </div>
                </div>
            )}

            <RcTable
                className={cn(classes.table)}
                columns={columns}
                data={data}
                emptyText={<div className="py-5 text-center lg:py-8">No Data</div>}
                rowKey={(record: any, index: any) => index}
            />
            <div className="flex flex-col justify-center md:flex-row md:justify-between  my-3 p-1">
                <PageInformation
                    pageSize={pageSize}
                    currentPage={currentPage}
                    totalRecords={totalRecords}
                    setPageSize={setPageSize}
                />
                {totalRecords >= pageSize && (
                    <Pagination
                        pageSize={pageSize}
                        currentPage={currentPage}
                        totalRecords={totalRecords}
                        onPageChange={onPageChange}
                    />
                )}
            </div>
        </div>
    );
}

type TextAlign = 'left' | 'center' | 'right';

export interface HeaderCellProps {
    title: React.ReactNode;
    width?: number | undefined;
    align?: TextAlign;
    ellipsis?: boolean;
    sortable?: boolean;
    sortDir?: 'asc' | 'desc' | undefined;
    sortBy?: string | undefined;
    iconClassName?: string;
    className?: string;
    keyName?: string;
    setSort?: ({ key, sort }: any) => void;
}

// A util func
function handleTextAlignment(align: TextAlign) {
    if (align === 'center') return 'justify-center';
    if (align === 'right') return 'justify-end';
    return '';
}

export function HeaderCell({
    title,
    align = 'left',
    width,
    ellipsis,
    sortable,
    sortDir,
    sortBy,
    className,
    keyName = '',
    setSort = ({ key, sort }: any) => {},
}: HeaderCellProps) {
    const sortClick = () => {
        setSort({ sort: sortDir ? (sortDir == 'asc' ? 'desc' : 'asc') : 'asc', key: keyName });
    };
    return (
        <div
            className={cn(
                'flex items-center gap-1',
                sortable && 'cursor-pointer',
                handleTextAlignment(align),
                className
            )}
            onClick={() => {
                if (sortable) {
                    sortClick();
                }
            }}
        >
            <div {...(ellipsis && { className: 'truncate' })} {...(width && { style: { width } })}>
                <b>{title}</b>
            </div>
            {sortable && (
                <div className="inline-flex">
                    {sortDir && sortBy === keyName ? (
                        sortDir == 'desc' ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ color: 'black', transform: 'rotate3d(0, 0, 1, 180deg)' }}
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="18" y1="13" x2="12" y2="19"></line>
                                <line x1="6" y1="13" x2="12" y2="19"></line>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ color: 'black' }}
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="18" y1="13" x2="12" y2="19"></line>
                                <line x1="6" y1="13" x2="12" y2="19"></line>
                            </svg>
                        )
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="mantine-9cumsf"
                            viewBox="0 0 24 24"
                            style={{ color: 'rgb(173, 181, 189)' }}
                        >
                            <path stroke="none" d="M0 0h24v24H0z"></path>
                            <path d="M8 7L12 3 16 7"></path>
                            <path d="M8 17L12 21 16 17"></path>
                            <path d="M12 3L12 21"></path>
                        </svg>
                    )}
                </div>
            )}
        </div>
    );
}
