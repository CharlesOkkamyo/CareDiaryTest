import { useFormik, ErrorMessage } from "formik";
import { loginSchema } from "../schemas";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/user-slice";
import { useNavigate } from "react-router-dom";



const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state) => state.auth);


    const onSubmit = (values) => {

        dispatch(registerUser(values))
            .unwrap()
            .catch((err) => {
                setErrors({ server: err.message || 'Registration failed' });
            })
            .finally(() => setSubmitting(false));
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

console.log(errors);

return (

    <form className="justify-center" onSubmit={handleSubmit} autoComplete="off">
        {error ? <ErrorMessage name={error} /> : null}
        <label htmlFor="email">Email</label>
        <input
            value={values.email}
            onChange={handleChange}
            id="email"
            type="email"
            placeholder="Enter your email"
            // onBlur={handleBlur}
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
            // onBlur={handleBlur}
            className={errors.password && touched ? "border-red-500" : ""}
        />
        <button type="submit" disabled={isLoading} className="w-20">
            Login
        </button>
    </form>
)
}

export default LoginForm;