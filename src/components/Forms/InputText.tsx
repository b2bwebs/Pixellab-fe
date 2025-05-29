import IconMail from '../Icon/IconMail';
import IconLockDots from '../Icon/IconLockDots';
import IconUser from '../Icon/IconUser';

type InputTextProps = {
    icon?: 'mail' | 'lock' | 'user' | '';
    type?:
        | 'number'
        | 'text'
        | 'password'
        | 'email'
        | 'tel'
        | 'search'
        | 'url'
        | 'time'
        | 'date'
        | 'week'
        | 'month'
        | 'datetime-local';
    label?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    error?: any;
    value?: string | number;
    containerClass?: any;
    readOnly?: boolean;
};

const ICONS = (iconType: string | undefined) => {
    switch (iconType) {
        case 'mail':
            return <IconMail fill={true} />;
        case 'lock':
            return <IconLockDots fill={true} />;
        case 'user':
            return <IconUser fill={true} />;
        default:
            return '';
    }
};

export default function InputText({
    icon = '',
    type = 'text',
    label = '',
    placeholder = 'placeholder',
    onChange = () => {},
    name = 'name',
    error = '',
    value = '',
    containerClass = '',
    readOnly = false,
}: InputTextProps): JSX.Element {
    return (
        <div className={containerClass}>
            <label htmlFor={name}>{label}</label>
            <div className={`relative text-white-dark  ${error && 'has-error'}`}>
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    className={`form-input ${
                        icon && 'ps-10'
                    } placeholder:text-white-dark disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b] `}
                    onChange={onChange}
                    readOnly={readOnly}
                    disabled={readOnly}
                />
                <span className="absolute start-4 top-1/2 -translate-y-1/2">{ICONS(icon)}</span>
            </div>
            <div className="text-danger mt-1">{error}</div>
        </div>
    );
}
