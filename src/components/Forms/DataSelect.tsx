import React from 'react';
import Select from 'react-select';

interface Option {
    label: string;
    value: string;
}

interface DataSelectProps {
    label?: string;
    placeholder?: string;
    options?: Option[];
    divRap?: boolean;
    onChange?: (event: { target: { name: string; value: any } }) => void;
    value?: any;
    name?: string;
    error?: any;
    containerClass?: string;
}

const DataSelect: React.FC<DataSelectProps> = ({
    label = '',
    placeholder = '',
    options = [],
    divRap = true,
    onChange = () => {},
    value = '',
    name = 'name',
    error = {},
    containerClass = '',
}) => {
    const handleChange = (selectOptions: any) => {
        onChange({
            target: {
                name,
                value: selectOptions ? selectOptions : '',
            },
        });
    };

    const selectComponent = (
        <Select
            classNamePrefix="form-input"
            placeholder={placeholder}
            options={options}
            onChange={handleChange}
            value={value[name] ?? null}
        />
    );

    return divRap ? (
        <div className={containerClass}>
            <label className="form-label">{label}</label>
            <div className="">{selectComponent}</div>
            <p className="text-danger mt-1">{error[name]}</p>
        </div>
    ) : (
        selectComponent
    );
};

export default DataSelect;
