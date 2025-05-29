// import CategoryFormModal from '@/Modals/FormModals/CategoryModal/CategoryFormModal';
// import ModalTransition from '../Share/ModalTransition';
import Btn from './Btn';
import FetchSelect from './FetchSelect';
import { useState } from 'react';
import { SERVICE } from '@/constants/services';

interface ProductSelector {
    onchange?: () => void;
    value?: any;
    error?: any;
}
export default function ProductSelector({
    onChange = () => {},
    value = '',
    name = 'name',
    label = 'Select Products',
    error = {},
    isMulti = false,
    placeholder = 'Select Products',
}: any) {
    const [openCategoryTypeModal, setOpenCategoryTypeModal] = useState<string | undefined>('');
    const [reRenderFetch, setRenderFetch] = useState(false);

    return (
        <div>
            <label>{label}</label>
            <div className="flex gap-2">
                <FetchSelect
                    name={name}
                    placeholder={placeholder}
                    url={SERVICE.PRODUCTS}
                    setLabel="product_name"
                    setValue="id"
                    label=""
                    filter={{ is_hold: 0 }}
                    onChange={onChange}
                    value={value}
                    containerClass="w-full "
                    reRender={reRenderFetch}
                    isMulti={isMulti}
                />
            </div>
            <p className="text-danger mx-2 ">{error[name]}</p>
            {/* <CategoryFormModal
                openCategoryType={openCategoryTypeModal}
                onClose={() => {
                    setOpenCategoryTypeModal(undefined);
                    setRenderFetch((prv) => !prv);
                }}
            /> */}
        </div>
    );
}
