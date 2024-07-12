import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const registerSchema = yup.object().shape({
    name: yup.string().max(255).min(3).required("Required"),
    email: yup.string().email("Please enter a valid email").required("required"),
    password: yup
        .string()
        .min(5)
        .matches(passwordRules, { message: "Please create a stronger password" })
        .required("Required"),
    c_password: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords musht match!")
        .required("Required")
});

export const loginSchema = yup.object().shape({

    email: yup.string().email("Please enter a valid email").required("required"),
    password: yup
        .string()
        .min(5)
        .matches(passwordRules, { message: "Please create a stronger password" })
        .required("Required")
});