import React, { useEffect, useState } from 'react';
import IconXCircle from './Icon/IconXCircle';
import Btn from './Forms/Btn';
import DynamicSelect from './Forms/DynamicSelect';
import { SELECT_OVERLAY } from '@/constants/others';
import { useQueryParams } from '@/hooks';
import IconPencil from './Icon/IconPencil';
import IconFilter from './Icon/IconFilter';

interface TableFilterDrawerProps {
    open?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    onClose?: () => void;
    onSubmit?: () => void;
    setOpen?: () => void;
    filters?: any[];
}

const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'w-full',
};

const TableFilterDrawer: React.FC<TableFilterDrawerProps> = ({
    open = false,
    size = 'sm',
    onClose = () => {},
    setOpen = () => {},
    onSubmit = (query?: any) => {},
    filters = [],
}) => {
    const sizeClass = sizeClasses[size];
    const [filtersActive, setFiltersActive] = useState(false);
    const [filtersValues, setFiltersValue] = useState<any>({});
    const { updateSearchParam, searchParams } = useQueryParams();

    const applyFilterQuery = () => {
        setFiltersActive(false);
        filters.map((filterItem: any, key: any) => {
            const filValue = searchParams.get(SELECT_OVERLAY[filterItem].setQueryName)
                ? JSON.parse(searchParams.get(SELECT_OVERLAY[filterItem].setQueryName)!)
                : filterItem.isMulti
                ? []
                : undefined;
            setFiltersValue((prv: any) => ({ ...prv, [SELECT_OVERLAY[filterItem].setQueryName]: filValue }));

            if (filValue || (filterItem.isMulti && filValue.length)) {
                setFiltersActive(true);
            }
        });
    };

    const resetFilters = () => {
        let empty: any = {};
        setFiltersValue(empty);
        const deleteQuery = filters.map((filterItem: any) => SELECT_OVERLAY[filterItem].setQueryName);
        updateSearchParam({ deleteParams: deleteQuery });
        onSubmit(empty);
    };

    useEffect(() => {
        applyFilterQuery();
    }, [searchParams]);

    return (
        <>
            <div className="relative inline-flex w-fit">
                {filtersActive && (
                    <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-red-400 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                        !
                    </div>
                )}

                <button type="button" className="btn btn-primary" onClick={setOpen}>
                    <IconFilter className="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0" />
                    Filter
                </button>
            </div>
            <main
                className={
                    'fixed inset-0 z-[999] overflow-y-auto bg-[black]/60 ' +
                    (open
                        ? 'transition-opacity opacity-100 duration-500 translate-x-0'
                        : 'transition-all delay-500 opacity-0 translate-x-full')
                }
            >
                <section
                    className={
                        `w-screen right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform flex flex-col ${sizeClass} ` +
                        (open ? 'translate-x-0' : 'translate-x-full')
                    }
                >
                    {open && (
                        <>
                            {' '}
                            <div className="header">
                                <div className="flex justify-between px-3 py-3 border-b-2">
                                    <div className="prose">
                                        <h4 className="m-0 dark:text-white-dark">Table Filters</h4>
                                    </div>

                                    <button onClick={onClose}>
                                        <IconXCircle className="my-auto" />
                                    </button>
                                </div>
                            </div>
                            <div className="px-2 px-2 mt-4">
                                {filters.map((filterItem: any, key: any) => (
                                    <DynamicSelect
                                        key={key}
                                        type={SELECT_OVERLAY[filterItem].formType}
                                        title={SELECT_OVERLAY[filterItem].title}
                                        URL={SELECT_OVERLAY[filterItem].api}
                                        setLabel={SELECT_OVERLAY[filterItem].label}
                                        setValue={SELECT_OVERLAY[filterItem].value}
                                        isMulti={SELECT_OVERLAY[filterItem].isMulti}
                                        filter={SELECT_OVERLAY[filterItem].filter}
                                        setQueryName={SELECT_OVERLAY[filterItem].setQueryName}
                                        onChange={(key, value) => {
                                            updateSearchParam({ options: { [key]: value } });
                                        }}
                                        value={filtersValues[SELECT_OVERLAY[filterItem].setQueryName] ?? {}}
                                        customOptions={SELECT_OVERLAY[filterItem].customOptions}
                                    />
                                ))}
                                {filtersActive && (
                                    <Btn title="Clear" icon="trash" uiType="dark" onClick={resetFilters} />
                                )}
                            </div>
                            <div className="footer  px-3 py-5 mt-auto">
                                <Btn
                                    title="Show Results"
                                    onClick={() => {
                                        onSubmit();
                                        onClose();
                                    }}
                                />
                            </div>
                        </>
                    )}
                </section>
            </main>
        </>
    );
};

export default TableFilterDrawer;
