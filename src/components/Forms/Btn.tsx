import cn from '@/utils/ClassNames';
import IconLoader from '../Icon/IconLoader';
import IconMail from '../Icon/IconMail';
import IconLockDots from '../Icon/IconLockDots';
import IconUser from '../Icon/IconUser';
import IconTrash from '../Icon/IconTrash';
import IconPlus from '../Icon/IconPlus';
import IconAirplay from '../Icon/IconAirplay';
import IconDownload from '../Icon/IconDownload';

const classes = {
    btn: 'btn',
    primary: 'btn-primary',
    primaryOutLine: 'btn-outline-primary',
    full: 'w-full',
    roundedFull: 'rounded-full',
    dark: 'btn-dark',
    darkOutLine: 'btn-outline-dark',
    wAuto: 'w-auto',
    success: 'btn-success',
    successOutLine: 'btn-outline-success',
};

type ButtonProps = {
    isDisable?: boolean;
    size?: 'full' | 'roundedFull' | 'wAuto';
    type?: 'button' | 'submit' | 'reset';
    uiType?: 'primary' | 'primaryOutLine' | 'dark' | 'darkOutLine' | 'success' | 'successOutLine';
    title?: string;
    onClick?: () => void;
    isLoading?: boolean;
    className?: string;
    icon?: string;
};

const ICONS = (iconType: string | undefined) => {
    const icon_class = 'w-5 h-5 ltr:mr-1.5 rtl:ml-1.5 shrink-0 my-auto';
    switch (iconType) {
        case 'mail':
            return <IconMail fill={true} className={icon_class} />;
        case 'lock':
            return <IconLockDots fill={true} className={icon_class} />;
        case 'user':
            return <IconUser fill={true} className={icon_class} />;
        case 'trash':
            return <IconTrash fill={true} className={icon_class} />;
        case 'plus':
            return <IconPlus fill={true} className={icon_class} />;
        case 'upArrow':
            return <IconAirplay fill={true} className={icon_class} />;
        case 'download':
            return <IconDownload fill={true} className={icon_class} />;
        default:
            return '';
    }
};

const Btn: React.FC<ButtonProps> = ({
    size = 'full',
    className = '',
    isDisable = false,
    uiType = 'primary',
    title = 'label',
    type = 'button',
    onClick = () => {},
    isLoading = false,
    icon = '',
}) => {
    return (
        <>
            <button
                disabled={isDisable || isLoading}
                className={cn(classes.btn, classes[uiType], classes[size], className)}
                type={type}
                onClick={onClick}
            >
                {icon && ICONS(icon)}
                {isLoading ? (
                    <IconLoader
                        className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0"
                        duotone={true}
                        fill={true}
                    />
                ) : (
                    title
                )}
            </button>
        </>
    );
};

export default Btn;
