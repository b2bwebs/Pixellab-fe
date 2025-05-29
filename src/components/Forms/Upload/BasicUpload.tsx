import IconXCircle from '@/components/Icon/IconXCircle';
import ThreeDotLoader from '@/components/Loader/ThreeDotLoader';
import { SERVICE } from '@/constants/services';
import { useActionCall } from '@/hooks';

import { useRef, useState } from 'react';

const getRealFileName = (responsePath = '') => {
    return responsePath;
};

export default function BasicUpload({
    label = '',
    name = 'name',
    value = '',
    error = '',
    onChange = () => {},
    showFileValue = true,
    hideInputShowLoader = false,
}: any) {
    const { loading, Upload } = useActionCall(SERVICE.UPLOAD);

    const fileRef: any = useRef();
    const [fileName, setFileName] = useState(getRealFileName(value[name]) ?? '');

    const fileUploadCall = async (rawFile: any) => {
        let response = await Upload(rawFile);
        if (response.data.length) {
            let filePath = response.data[0].path;
            if (showFileValue) {
                setFileName((prv) => getRealFileName(filePath));
            }
            onChange({
                target: {
                    name,
                    value: filePath,
                },
            });
        }
    };

    const clearFile = () => {
        fileRef.current.value = '';

        onChange({
            target: {
                name,
                value: '',
            },
        });
        setFileName((prv) => '');
    };

    return (
        <div>
            <div className="flex">
                <label>{label}</label>
            </div>
            {hideInputShowLoader && loading ? (
                <div className="flex justify-center">
                    <div className="">
                        <span className="text-lg ml-5 font-semibold text-black dark:text-white">uploading...</span>
                        <ThreeDotLoader />
                    </div>
                </div>
            ) : (
                <div className="flex  relative w-full py-2 border mb-2.5 rounded-lg border-solid ">
                    <div className="w-full flex items-center relative">
                        <input
                            className={`w-full`}
                            id="image-input"
                            type="file"
                            ref={fileRef}
                            onChange={(event: any) => fileUploadCall(event.target.files[0])}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="image-input" className="w-full px-2">
                            <input
                                type="text"
                                readOnly
                                value={fileName || ''}
                                className="w-9/12 border-none focus:outline-none cursor-pointer"
                                onClick={() => fileRef.current.click()}
                            />
                            {loading ? (
                                <span className="browse-button wm-cp ">Uploading ...</span>
                            ) : (
                                !fileName && <span className="browse-button wm-cp">Choose file</span>
                            )}
                        </label>
                        {fileName && (
                            <button className="mr-2" onClick={clearFile}>
                                <IconXCircle />
                            </button>
                        )}
                    </div>
                </div>
            )}

            <p className="text-danger">{error[name]}</p>
        </div>
    );
}
