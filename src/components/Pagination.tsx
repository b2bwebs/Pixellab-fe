import IconCaretDown from '@/components/Icon/IconCaretDown';
import Dropdown from './Dropdown';
interface PaginationProps {
    currentPage: number;
    totalRecords: number;
    pageSize: number;
    onPageChange?: (page: number) => void;
}

const MAX_PAGENUMBER_SHOW = 3;

const Pagination = ({
    currentPage = 1,
    totalRecords = 50,
    pageSize = 2,
    onPageChange = (page: any) => {},
}: PaginationProps) => {
    const totalPages = Math.ceil(totalRecords / pageSize);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGENUMBER_SHOW / 2));
        let endPage = Math.min(totalPages, startPage + MAX_PAGENUMBER_SHOW - 1);

        if (endPage - startPage < MAX_PAGENUMBER_SHOW - 1) {
            startPage = Math.max(1, endPage - MAX_PAGENUMBER_SHOW + 1);
        }
        if (startPage > 1) {
            pageNumbers.push(
                <button
                    key={1}
                    className={`page-number ${
                        currentPage === 1
                            ? 'bg-primary text-white dark:text-white-light dark:bg-primary'
                            : 'bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                    } flex justify-center font-semibold px-3.5 py-2 rounded-full transition  `}
                    onClick={() => handlePageClick(1)}
                    type="button"
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pageNumbers.push(<span key="start-ellipsis">...</span>);
            }
        }
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`page-number ${
                        i === currentPage
                            ? 'bg-primary text-white dark:text-white-light dark:bg-primary'
                            : 'bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                    } flex justify-center font-semibold px-3.5 py-2 rounded-full transition  `}
                    onClick={() => handlePageClick(i)}
                    type="button"
                >
                    {i}
                </button>
            );
        }
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(<span key="end-ellipsis">...</span>);
            }
            pageNumbers.push(
                <button
                    key={totalPages}
                    className={`page-number ${
                        currentPage === totalPages
                            ? 'bg-primary text-white dark:text-white-light dark:bg-primary'
                            : 'bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                    } flex justify-center font-semibold px-3.5 py-2 rounded-full transition  `}
                    onClick={() => handlePageClick(totalPages)}
                    type="button"
                >
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
    };
    return (
        <div>
            <ul className="inline-flex items-center space-x-1 rtl:space-x-reverse m-auto">
                <button
                    disabled={currentPage === 1}
                    type="button"
                    className={` flex justify-center font-semibold p-2 rounded-full transition ${
                        currentPage === 1
                            ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                            : 'bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                    }`}
                    onClick={handlePrevious}
                >
                    <IconCaretDown className="w-5 h-5 rotate-90 rtl:-rotate-90" />
                </button>
                {renderPageNumbers()}

                <li>
                    <button
                        disabled={currentPage === totalPages}
                        type="button"
                        className={` flex justify-center font-semibold p-2 rounded-full transition ${
                            currentPage === totalPages
                                ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                                : 'bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                        }`}
                        onClick={handleNext}
                    >
                        <IconCaretDown className="w-5 h-5 -rotate-90 rtl:rotate-90" />
                    </button>
                </li>
            </ul>
        </div>
    );
};

export function PageInformation({
    totalRecords = 0,
    currentPage = 1,
    pageSize = 10,
    setPageSize = (pageSize: string | number) => {},
}) {
    const startEntry = (currentPage - 1) * pageSize + 1;
    const endEntry = Math.min(currentPage * pageSize, totalRecords);
    return (
        <div className="mantine-Text-root mantine-k12qaq my-auto flex gap-2">
            <span className="my-auto">
                Showing {startEntry} to {endEntry} of {totalRecords} entries
            </span>
            <div className="my-auto dropdown">
                <Dropdown
                    placement={`${true ? 'top-start' : 'top-end'}`}
                    btnClassName="btn px-3 py-1 bg-gray  shadow-none "
                    button={<>{pageSize}</>}
                >
                    <ul className="!min-w-[170px]">
                        {[10, 20, 30, 50, 100].map((item, key) => (
                            <li key={key} className={` ${pageSize === item && 'text-white-dark'}`}>
                                <button type="button" disabled={pageSize === item} onClick={() => setPageSize(item)}>
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </Dropdown>
            </div>
        </div>
    );
}

export default Pagination;
