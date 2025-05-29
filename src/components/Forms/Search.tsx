import IconSearch from '../Icon/IconSearch';

export default function Search({ placeholder = 'Search... ', value = '', onChange = (e: any) => {} }) {
    return (
        <div className="relative group flex-1">
            <input
                type="text"
                className="form-input peer ltr:!pr-10 rtl:!pl-10"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <div className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                <IconSearch />
            </div>
        </div>
    );
}
