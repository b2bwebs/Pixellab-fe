import { Dialog, Transition } from '@headlessui/react';
import { Children, Fragment } from 'react';
import IconX from './Icon/IconX';

const ModalSize: any = {
    large: 'max-w-xl',
    small: 'max-w-sm ',
    extraLarge: 'max-w-5xl',
};
const ModalTransition = ({ children, size = 'large', title = '', open = false, onClose = () => {} }: any) => {
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" open={open} onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                    <div className="flex min-h-screen items-start justify-center px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                as="div"
                                className={`panel my-8 w-full ${ModalSize[size]} rounded-lg border-0 p-0 text-black dark:text-white-dark`}
                            >
                                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                    <div className="text-lg font-bold">{title}</div>
                                    <button type="button" className="text-white-dark hover:text-dark" onClick={onClose}>
                                        <IconX />
                                    </button>
                                </div>
                                <div className="p-5">{children}</div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ModalTransition;
