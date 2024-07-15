import { useFormik } from "formik";
import { registerSchema } from "../schemas";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/auth-action";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState(null);
    const { loading, userInfo, success } = useSelector((state) => state.auth)
    const navigate = useNavigate();

    useEffect(() => {
        if (success) navigate('/login')
        if (userInfo) navigate('/')
    }, [navigate, userInfo, success])

    const onSubmit = async (values) => {
        try {
            const response = await dispatch(registerUser(values));
           
            if(response.payload.success){
                setErrorMessage(null)
                navigate("/login");
            }else{
                setErrorMessage(response.payload.message)
                console.log(response)
            }
        } catch (error) {
            errorMessage(error.message)
            console.error("An error occurred:", error.message);
        }
    };

    const { values, errors, touched, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            c_password: "",
        },
        validationSchema: registerSchema,
        onSubmit,
    });

    return (

        <form className="justify-center" onSubmit={handleSubmit} autoComplete="off">
            <p className="text-red-500">{errorMessage}</p>
            <label htmlFor="email">Name</label>
            <input
                value={values.name}
                onChange={handleChange}
                id="name"
                type="text"
                placeholder="Enter your name"
                className={errors.name && touched ? "border-red-500" : ""}
            />
            <label htmlFor="email">Email</label>
            <input
                value={values.email}
                onChange={handleChange}
                id="email"
                type="email"
                placeholder="Enter your email"
                className={errors.email && touched ? "border-red-500" : ""}
            />
            <label htmlFor="password">Password</label>
            <input
                value={values.password}
                onChange={handleChange}
                id="password"
                type="password"
                placeholder="Enter your password"
                className={errors.password && touched ? "border-red-500" : ""}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
                value={values.c_password}
                onChange={handleChange}
                id="c_password"
                type="password"
                placeholder="Confirm your password"
                className={errors.c_password && touched ? "border-red-500" : ""}
            />
            <button type="submit" disabled={loading} className="w-20">
                Register
            </button>
        </form>
    )
}

export default RegisterForm;