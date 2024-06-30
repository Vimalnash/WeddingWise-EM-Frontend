import { useNavigate } from "react-router-dom";
import { NavBar } from "../Components/NavBar";
import { handleUserLogin } from "../Authentication/auth";
import { useState } from "react";
import { useFormik } from "formik";
import { PageHeader } from "../Components/PageHeader";
import { loginSchema } from "../Schemas/LoginSchema";

// User Login Page
export function UserLoginPage() {
    const navigate = useNavigate();
    const [failureMessage, setFailureMessage] = useState("");

    let loginData = {
        email: "",
        password: ""
    };

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched
    } = useFormik({
        initialValues: loginData,
        validationSchema: loginSchema,
        onSubmit: (values, {resetForm}) => {
            handleLogin(values);
            resetForm({values: ""})
        }
    });

    // Handling Login and Loggedin Data
    function handleLogin(loginPayload) {
        handleUserLogin(loginPayload)
        .then((data) => {
            if(data.error) {
                setFailureMessage(data.error);
            } else {
                setFailureMessage("");
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("vendor", JSON.stringify(data.vendor));
                navigate("/");
                location.reload();
            }
        })
    };

    // Forgot Password Button Hanlde
    function forgotPassword(){
        navigate("/user/resetpassword");        
    };

    return (
        <>
            <NavBar />
            <PageHeader>
                <h2>User Login</h2>
            </PageHeader>
            <div className="d-flex flex-column justify-content-center align-items-center mt-5 paper">
            <form className="d-flex flex-column justify-content-center align-items-center mt-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.email && errors.email ?
                        (<div className="ps-2 text-start text-danger">{errors.email}</div>)
                        :
                        ("")
                    }
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.password && errors.password ?
                        (<div className="ps-2 text-start text-danger">{errors.password}</div>)
                        :
                        ("")
                    }
                </div>
                <button type="submit" className="btn btn-primary mb-3">Login</button>
                <button type="submit" className="btn btn-primary mb-3" onClick={forgotPassword}>Forgot Password?</button>
            </form>
            </div>
            <div className="text-center">
                <span>Not Yet Registered? </span>
                <button className="btn btn-outline-primary" onClick={() => navigate("/user/signup")}>Signup Free</button>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            {
                failureMessage ? (<div className="text-center text-danger">{failureMessage}</div>) : ("")
            }
        </>
    )
};
