import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useGetCall } from '@/hooks';

interface FetchSelectProps {
    url: string;
    filter?: any;
    label?: string;
    setLabel?: string;
    setValue?: string;
    placeholder?: string;
    name?: string;
    onChange?: (event: { target: { name: string; value: any } }) => void;
    value?: any;
    error?: any;
    disable?: boolean;
    ignoreRecord?: any;
    ignoreRecords?: any[];
    containerClass?: string;
    recoilApi?: (fun: void) => void;
    reRender?: string | boolean;
    isMulti?: boolean;
}

const PAGE_SIZE = 10;

const FetchSelect: React.FC<FetchSelectProps> = ({
    url,
    filter = {},
    label = '',
    setLabel = 'label',
    setValue = 'value',
    placeholder = 'place holder',
    name = 'name',
    onChange = () => {},
    value = '',
    error = '',
    disable = false,
    ignoreRecord = {},
    ignoreRecords = [],
    containerClass = '',
    reRender = false,
    isMulti = false,
}) => {
    const asyRef: any = useRef();
    const { data, setQuery } = useGetCall(url, {
        avoidFetch: true,
    });
    const { fetchApi } = useGetCall(url, {
        avoidFetch: true,
    });
    const [prevFilter, setPrevFilter] = useState(filter);

    const handleChange = (selectOptions: any) => {
        onChange({
            target: {
                name,
                value: selectOptions ? selectOptions : '',
            },
        });
    };

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
        if (JSON.stringify(filter) !== JSON.stringify(prevFilter)) {
            setQuery({ filter, pageSize: PAGE_SIZE });

            setPrevFilter(filter);
        }
    }, [filter]);

    useMemo(() => {
        setQuery({ filter, pageSize: PAGE_SIZE });
    }, [reRender]);

    const convertOptions = (recordItem: any[]) => {
        let options = recordItem.map((item) => ({
            label: item[setLabel],
            value: item[setValue],
        }));

        if (ignoreRecord?.value) {
            return options.filter((item) => item.value !== ignoreRecord.value);
        }

        return options;
    };

    useEffect(() => {
        //single Ignore
        if (ignoreRecord?.value && value[name] === ignoreRecord?.value) {
            onChange({
                target: {
                    name,
                    value: '',
                },
            });
        }
    }, [value[name]]);

    return (
        <div className={containerClass}>
            {label && <label>{label}</label>}

            <div className="custom-select">
                <AsyncSelect
                    isMulti={isMulti}
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={true}
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={value[name] ?? ''}
                    defaultOptions={data?.data?.length ? convertOptions(data?.data) : []}
                    //NoOptionsMessage={true ? <p>Add New</p> : ""}
                    // options={data?.data?.length ? convertOptions(data?.data) : []}
                    loadOptions={filterAction}
                    isDisabled={disable}
                />
            </div>
            <p className="text-danger mx-2 ">{error[name]}</p>
        </div>
    );
};

export default FetchSelect;
