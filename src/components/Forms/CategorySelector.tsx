// import CategoryFormModal from '@/Modals/FormModals/CategoryModal/CategoryFormModal';
// import ModalTransition from '../Share/ModalTransition';
import Btn from './Btn';
import FetchSelect from './FetchSelect';
import { useState } from 'react';
import { SERVICE } from '@/constants/services';

interface CategorySelector {
    onchange?: () => void;
    value?: any;
    error?: any;
    categoryType: 'category' | 'concern' | 'ingredient';
}
export default function CategorySelector({
    onChange = () => {},
    value = '',
    name = 'name',
    label = 'Category',
    error = {},
    categoryType = 'category',
    isMulti = false,
    placeholder = 'Select Category',
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
                    url={SERVICE.CATEGORIES}
                    setLabel="category_name"
                    setValue="id"
                    label=""
                    filter={{ category_type: categoryType }}
                    onChange={onChange}
                    value={value}
                    containerClass="w-8/12 "
                    reRender={reRenderFetch}
                    isMulti={isMulti}
                />
                <div>
                    <Btn
                        title={`Add ${label}`}
                        icon="plus"
                        size="wAuto"
                        onClick={() => {
                            setOpenCategoryTypeModal(categoryType);
                        }}
                        className="text-xs"
                    />
                </div>
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
