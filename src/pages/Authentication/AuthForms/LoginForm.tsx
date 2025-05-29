import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import Btn from '@/components/Forms/Btn';
import InputText from '@/components/Forms/InputText';
import { LOGIN_SCHEMA } from './authSchema';
import { useActionCall, useQueryParams } from '@/hooks';
import { SERVICE } from '@/constants/services';
import Lib from '@/utils/Lib';

const LoginForm = () => {
    const { navigate } = useQueryParams();
    const { loading, Post } = useActionCall(SERVICE.LOGIN);

    const { values, handleChange, errors, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            let response: any = await Post(values, 'Login successfull');
            console.log(response);

            if (response) {
                const { user, token } = await response.data;

                Lib.setCookies({
                    name: 'session-token',
                    value: token.access,
                    exp: Lib.DecodeJwt(token.access)?.exp ? Lib.expiredSec(Lib.DecodeJwt(token.access)?.exp ?? 1) : 1,
                });
                Lib.setCookies({
                    name: 'refresh-token',
                    value: token.refresh,
                    exp: Lib.DecodeJwt(token.refresh)?.exp ? Lib.expiredSec(Lib.DecodeJwt(token.refresh)?.exp ?? 1) : 1,
                });
                navigate.push('/dashboard');
            }
        },
        validateOnChange: false,
        validateOnBlur: true,
        validationSchema: LOGIN_SCHEMA,
    });
    return (
        <form className="space-y-5 dark:text-white" onSubmit={handleSubmit}>
            <InputText
                icon="mail"
                type="email"
                label="Email"
                name="email"
                onChange={handleChange}
                placeholder="Enter Email"
                value={values.email}
                error={errors.email}
            />
            <InputText
                icon="lock"
                type="password"
                label="Password"
                name="password"
                onChange={handleChange}
                placeholder="Enter Password"
                value={values.password}
                error={errors.password}
            />

            <Btn title="Sign in" type="submit" isLoading={loading} />
        </form>
    );
};

export default LoginForm;
