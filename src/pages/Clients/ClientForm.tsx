import * as Yup from 'yup';
import { useFormik } from 'formik';
import InputText from '@/components/Forms/InputText';
import Btn from '@/components/Forms/Btn';
import BasicUpload from '@/components/Forms/Upload/BasicUpload';
import { useMemo } from 'react';
import InputTextArea from '@/components/Forms/InputTextArea';

export const CLIENT_SCHEMA = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required Email*'),
    company_name: Yup.string().required('Required Company Name*'),
    password: Yup.string().required('Required Password*'),
    address: Yup.string().required('Required Address*'),
    allowed_origins: Yup.string().required('Required Allowed Origins*'),
    contact_no: Yup.string().required('Required Contact No*'),
    gst_no: Yup.string().required('Required GST No*'),
    default_max_pages: Yup.string().required('Default Max Pages*'),
    sec_mobile: Yup.string().required('Required Secondary Mobile*'),
    ai_config: Yup.array().of(
        Yup.object().shape({
            file_pages: Yup.number().required('Required'),
            max_final_pages: Yup.number().required('Required'),
        })
    ),
});

const ClientForm = ({
    data = {},
    onAction = (values: any) => {},
    onCloseModal = () => {},
    loading = false,
    RequestError = {},
}: any) => {
    const { values, handleChange, errors, handleSubmit, setFieldValue, setErrors } = useFormik({
        initialValues: {
            email: data?.user?.email ?? '',
            company_name: data?.company_name ?? '',
            password: data?.user?.password ?? '',
            address: data?.address ?? '',
            allowed_origins:
                data?.allowed_origins?.map((each_domain_obj: any) => each_domain_obj.origin).join(',') ?? '',
            contact_no: data?.contact_no ?? '',
            gst_no: data?.gst_no ?? '',
            sec_mobile: data?.sec_mobile ?? '',
            default_max_pages: data?.default_max_pages ?? 4,
            ai_config: data?.ai_config?.length ? data.ai_config : [{ file_pages: 1, max_final_pages: 1 }],
        },

        onSubmit: async (values: any) => {
            onAction(values);
        },

        validateOnChange: false,
        validateOnBlur: true,
        validationSchema: CLIENT_SCHEMA,
    });

    useMemo(() => {
        if (RequestError && Object.keys(RequestError).length) {
            setErrors(RequestError);
        }
    }, [RequestError]);

    // console.log({ values });
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <InputText
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    error={errors.email}
                />
                <InputText
                    label="Company Name"
                    name="company_name"
                    onChange={handleChange}
                    value={values.company_name}
                    error={errors.company_name}
                />
                <InputText
                    type="password"
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    error={errors.password}
                />
                <InputTextArea
                    containerClass="my-4"
                    label="Address"
                    name="address"
                    onChange={handleChange}
                    value={values.address}
                    error={errors.address}
                />

                <InputTextArea
                    containerClass="my-4"
                    label="Allowed Origins"
                    name="allowed_origins"
                    onChange={handleChange}
                    value={values.allowed_origins}
                    error={errors.allowed_origins}
                />
                <InputText
                    label="Contact No"
                    name="contact_no"
                    onChange={handleChange}
                    value={values.contact_no}
                    error={errors.contact_no}
                />
                <InputText
                    label="GST No"
                    name="gst_no"
                    onChange={handleChange}
                    value={values.gst_no}
                    error={errors.gst_no}
                />
                <InputText
                    type="number"
                    label="Default Max Pages"
                    name="default_max_pages"
                    onChange={handleChange}
                    value={values.default_max_pages}
                    error={errors.default_max_pages}
                />
                <InputText
                    label="Secondary Mobile"
                    name="sec_mobile"
                    onChange={handleChange}
                    value={values.sec_mobile}
                    error={errors.sec_mobile}
                />

                <div className="my-4">
                    <label className="block font-medium text-gray-700 mb-2">AI Config</label>

                    {values.ai_config.map((config: any, index: number) => (
                        <div key={index} className="flex gap-4 items-end mb-2">
                            <InputText
                                label="File Pages"
                                name={`ai_config[${index}].file_pages`}
                                value={config.file_pages}
                                onChange={handleChange}
                                // error={errors.ai_config?.[index]?.file_pages}
                            />
                            <InputText
                                label="Max Final Pages"
                                name={`ai_config[${index}].max_final_pages`}
                                value={config.max_final_pages}
                                onChange={handleChange}
                                // error={errors.ai_config?.[index]?.max_final_pages}
                            />
                            <button
                                type="button"
                                className="text-red-600 text-sm px-2 py-1 border border-red-600 rounded"
                                onClick={() => {
                                    const updatedConfigs = [...values.ai_config];
                                    updatedConfigs.splice(index, 1);
                                    setFieldValue('ai_config', updatedConfigs);
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <div className="flex gap-4 mt-2">
                        <Btn
                            type="button"
                            title="Add More"
                            onClick={() =>
                                setFieldValue('ai_config', [...values.ai_config, { file_pages: 1, max_final_pages: 1 }])
                            }
                        />
                        <Btn type="button" title="Remove All" onClick={() => setFieldValue('ai_config', [])} />
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-end">
                    <Btn title="Save" isLoading={loading} type="submit" />
                </div>
            </form>
        </div>
    );
};

export default ClientForm;
