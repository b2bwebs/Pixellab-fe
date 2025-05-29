import * as Yup from "yup";


export const LOGIN_SCHEMA = Yup.object().shape({
    email: Yup.string().email().required("Required Email Address*"),
    password: Yup.string().required("Required Password*"),
});

export const SIGNUP_SCHEMA = Yup.object().shape({
    email: Yup.string().required("Required email*"),
    password: Yup.string().required("Required password*"),
    name: Yup.string().required("Required name*"),
    // terms: Yup.string().required(
    //     "please accept the terms and conditions to continue"
    // ),
});

export const REFERRAL_SCHEMA = Yup.object().shape({
    invitation_code: Yup.string().required("Required Invitation code*"),
});

export const VERIFICATION_SCHEMA = Yup.object().shape({
    otp: Yup.string().required("Required OTP*"),
});

export const FORGOTPASSWORD_SCHEMA = Yup.object().shape({
    email: Yup.string().email().required("Required Email Address*"),
});

export const RESET_SCHEMA = Yup.object().shape({
    password: Yup.string().required("Required password*"),
    confirm_password: Yup.string()
        .required("Required Confirm password*")
        .oneOf([Yup.ref("password"), null], "Confirm Password must match password"),
});