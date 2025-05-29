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
    sec_mobile: Yup.string().required('Required Secondary Mobile*'),
});

const ClientForm = ({
    data = {},
    onAction = (values: any) => {},
    onCloseModal = () => {},
    loading = false,
    RequestError = {},
}: any) => {
    const { values, handleChange, errors, handleSubmit, setErrors } = useFormik({
        initialValues: {
            email: data?.user?.email ?? '',
            company_name: data?.company_name ?? '',
            password: data?.user?.password ?? '',
            address: data?.address ?? '',
            allowed_origins:
                data?.allowed_origins.map((each_domain_obj: any) => each_domain_obj.origin).join(',') ?? '',
            contact_no: data?.contact_no ?? '',
            gst_no: data?.gst_no ?? '',
            sec_mobile: data?.sec_mobile ?? '',
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
                    label="Secondary Mobile"
                    name="sec_mobile"
                    onChange={handleChange}
                    value={values.sec_mobile}
                    error={errors.sec_mobile}
                />

                {/* <BasicUpload label="Logo" name="image" error={errors} value={values} onChange={handleChange} /> */}

                <div className="mt-8 flex items-center justify-end">
                    <Btn title="Save" isLoading={loading} type="submit" />
                </div>
            </form>
        </div>
    );
};

export default ClientForm;
