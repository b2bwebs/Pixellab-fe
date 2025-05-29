import React, { useState, useCallback, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import Select, { ActionMeta } from 'react-select';
import { useGetCall, useQueryParams } from '@/hooks';

interface DynamicSelectProps {
    type?: 'SELECT' | 'FETCH_SELECT';
    title?: string;
    isMulti?: boolean;
    setQueryName?: string;
    placeholder?: string;
    onChange?: (queryName: string, selectedOptions: string) => void;
    URL?: string;
    setLabel?: string;
    setValue?: string;
    filter?: any;
    customOptions?: any[];
    value?: any;
}

const PAGE_SIZE = 10;

const DynamicSelect: React.FC<DynamicSelectProps> = ({
    type = 'SELECT',
    title = 'Title',
    isMulti = false,
    setQueryName = 'selected',
    placeholder = '',
    onChange = () => {},
    URL = '',
    setLabel = 'label',
    setValue = 'value',
    filter = {},
    customOptions = [],
    value = {},
}) => {
    const { searchParams } = useQueryParams();
    const defaultValue = searchParams.get(setQueryName)
        ? JSON.parse(searchParams.get(setQueryName)!)
        : isMulti
        ? []
        : undefined;

    if (type === 'FETCH_SELECT') {
        const [defaultOptions, setDefaultOptions] = useState<any[]>([]);
        const [initialRun, setInitialRun] = useState(true);
        const { loading, data, fetchApi } = useGetCall(URL, {
            query: {
                filter,
                pageSize: PAGE_SIZE,
            },
        });

        const filterAction = useCallback(async (search = '') => {
            const response = await fetchApi({
                query: { filter, pageSize: PAGE_SIZE, search: search },
            });

            return response?.data?.length
                ? response?.data?.map((item: any) => ({
                      label: item[setLabel],
                      value: item[setValue],
                  }))
                : [];
        }, []);

        useEffect(() => {
            if (initialRun && data?.data?.length) {
                setDefaultOptions(
                    data?.data?.map((item: any) => ({
                        label: item[setLabel],
                        value: item[setValue],
                    })) || []
                );
                setInitialRun(false);
            }
        }, [data]);

        return (
            <div className="mb-3">
                <label className="filter-label mb-1">{title}</label>
                <AsyncSelect
                    isMulti={isMulti}
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={true}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onChange={(selectedOptions, actionMeta) => {
                        onChange(setQueryName, JSON.stringify(selectedOptions));
                    }}
                    value={value}
                    defaultOptions={defaultOptions}
                    loadOptions={filterAction}
                    isLoading={loading}
                />
            </div>
        );
    } else if (type === 'SELECT') {
        return (
            <div className="mb-3">
                <label className="filter-label mb-1">{title}</label>
                <Select
                    defaultValue={defaultValue}
                    isMulti={isMulti}
                    closeMenuOnSelect={true}
                    hideSelectedOptions={true}
                    isClearable={true}
                    onChange={(selectedOptions, actionMeta) => {
                        onChange(setQueryName, JSON.stringify(selectedOptions));
                    }}
                    value={value}
                    options={customOptions}
                />
            </div>
        );
    } else {
        return null;
    }
};

export default DynamicSelect;
