import { useFormik, ErrorMessage } from "formik";
import { loginSchema } from "../schemas";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/auth/auth-action";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const { loading,userInfo, error } = useSelector((state) => state.auth)

    useEffect(() => {
        if (userInfo) {
          navigate('/')
        }
      }, [navigate, userInfo])

    const onSubmit = async (values) => {    
        try {
            const response = await dispatch(userLogin(values));
           
            if(response.payload.success){
                setErrorMessage(null)
                
                navigate("/");
            }else{
                setErrorMessage(response.payload.message)
                console.log(response)
            }
        } catch (error) {
            errorMessage(error.message)
            console.error("An error occurred:", error.message);
        }
    }

    const { values, errors, touched, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit,
    });

    return (

        <form className="justify-center" onSubmit={handleSubmit} autoComplete="off">
            {error && <ErrorMessage name={error} />}
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
                onChangeCapture={handleChange}
                className={errors.password && touched ? "border-red-500" : ""}
            />
            <button type="submit" disabled={loading} className="w-20">
                Login
            </button>
        </form>
    )
}

export default LoginForm;