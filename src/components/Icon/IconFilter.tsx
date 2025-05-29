import { FC } from 'react';

interface IconFilterProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconFilter: FC<IconFilterProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <>
            {!fill ? (
                <>
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="1.7"
                        viewBox="0 0 256 256"
                        className={className}
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            opacity={duotone ? '0.5' : '1'}
                            d="M230.6,49.53A15.81,15.81,0,0,0,216,40H40A16,16,0,0,0,28.19,66.76l.08.09L96,139.17V216a16,16,0,0,0,24.87,13.32l32-21.34A16,16,0,0,0,160,194.66V139.17l67.74-72.32.08-.09A15.8,15.8,0,0,0,230.6,49.53ZM40,56h0Zm106.18,74.58A8,8,0,0,0,144,136v58.66L112,216V136a8,8,0,0,0-2.16-5.47L40,56H216Z"
                        ></path>
                    </svg>
                </>
            ) : (
                <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="1.7"
                    viewBox="0 0 256 256"
                    className={className}
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        opacity={duotone ? '0.5' : '1'}
                        d="M230.6,49.53A15.81,15.81,0,0,0,216,40H40A16,16,0,0,0,28.19,66.76l.08.09L96,139.17V216a16,16,0,0,0,24.87,13.32l32-21.34A16,16,0,0,0,160,194.66V139.17l67.74-72.32.08-.09A15.8,15.8,0,0,0,230.6,49.53ZM40,56h0Zm106.18,74.58A8,8,0,0,0,144,136v58.66L112,216V136a8,8,0,0,0-2.16-5.47L40,56H216Z"
                    ></path>
                </svg>
            )}
        </>
    );
};

export default IconFilter;
