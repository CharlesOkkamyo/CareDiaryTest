import { ErrorMessage, useFormik } from "formik";
import { registerSchema } from "../schemas";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/user-slice";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const {isLoading, error} =  useSelector((state)=>state.auth)
    // const navigate = useNavigate();

    const onSubmit = (values) => {
        
        dispatch(registerUser(values));
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
            {error ? <ErrorMessage name={error} /> : null}
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
            <button type="submit" disabled={isLoading} className="w-20">
                Register
            </button>
        </form>
    )
}

export default RegisterForm;