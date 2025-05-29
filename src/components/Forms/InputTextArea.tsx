import IconMail from '../Icon/IconMail';
import IconLockDots from '../Icon/IconLockDots';
import IconUser from '../Icon/IconUser';

type InputTextArea = {
    icon?: 'mail' | 'lock' | 'user' | '';
    label?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    name?: string;
    error?: any;
    value?: any;
    containerClass?: any;
    readOnly?: boolean;
    rows?: number; // Added to allow control over textarea height
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

export default function InputTextArea({
    icon = '',
    label = '',
    placeholder = 'placeholder',
    onChange = () => {},
    name = 'name',
    error = '',
    value = '',
    containerClass = '',
    readOnly = false,
    rows = 4, // Default rows for textarea
}: InputTextArea): JSX.Element {
    return (
        <div className={containerClass}>
            <label htmlFor={name}>{label}</label>
            <div className={`relative text-white-dark ${error && 'has-error'}`}>
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    className={`form-input ${
                        icon && 'ps-10'
                    } placeholder:text-white-dark disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b]`}
                    onChange={onChange}
                    readOnly={readOnly}
                    disabled={readOnly}
                    rows={rows}
                />
                <span className="absolute start-4 top-3">{ICONS(icon)}</span>
            </div>
            <div className="text-danger mt-1">{error}</div>
        </div>
    );
}
