import React, { useEffect, useState } from 'react';
import IconXCircle from '../Icon/IconXCircle';
import Btn from '../Forms/Btn';
import DynamicSelect from '../Forms/DynamicSelect';
import { SELECT_OVERLAY } from '@/constants/others';
import { useQueryParams } from '@/hooks';
import IconPencil from '../Icon/IconPencil';
import IconX from '../Icon/IconX';
import IconArrowBackward from '../Icon/IconArrowBackward';
import IconEdit from '../Icon/IconEdit';

interface AsideDrawerProps {
    open?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    onClose?: () => void;
    onSubmit?: () => void;
    setOpen?: () => void;
    filters?: any[];
    children?: any;
    title?: string;
    titleBorder?: Boolean;
    Edit?: string | number;
    onEditNav?: () => void;
    showClose?: boolean;
}

const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'w-full',
};

const AsideDrawer: React.FC<AsideDrawerProps> = ({
    open = false,
    size = 'sm',
    onClose = () => {},
    title = '',
    children,
    titleBorder = true,
    Edit = '',
    onEditNav = () => {},
    showClose = true,
}) => {
    const sizeClass = sizeClasses[size];

    return (
        <>
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
                        `w-screen right-0 absolute bg-white dark:bg-black h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform flex flex-col ${sizeClass} ` +
                        (open ? 'translate-x-0' : 'translate-x-full')
                    }
                >
                    {open && (
                        <>
                            {' '}
                            <div className="header">
                                <div className={`flex justify-between px-3 py-3 ${titleBorder && 'border-b-2'}`}>
                                    <div className="prose flex">
                                        <div className="my-auto cursor-pointer" onClick={onClose}>
                                            <IconArrowBackward className=" w-6 h-6" />
                                        </div>
                                        <h4 className="m-0 dark:text-white-dark">{title}</h4>
                                    </div>

                                    <div className="flex gap-1">
                                        {Edit && (
                                            <button onClick={onEditNav}>
                                                <IconEdit className="my-auto" />
                                            </button>
                                        )}
                                        {showClose && (
                                            <button onClick={onClose}>
                                                <IconX className="my-auto" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="px-2 px-2 mt-4 bg-white dark:bg-black">{children}</div>
                            {/* <div className="footer  px-3 py-5 mt-auto">
                               
                            </div> */}
                        </>
                    )}
                </section>
            </main>
        </>
    );
};

export default AsideDrawer;
