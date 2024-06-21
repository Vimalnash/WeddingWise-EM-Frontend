import { useNavigate } from "react-router-dom";
import { NavBar } from "../Components/NavBar";
import { handleUserSignup } from "../Authentication/auth";
import { useState } from "react";
import { useFormik } from "formik";
import { PageHeader } from "../Components/PageHeader";
import { userSignupSchema } from "../Schemas/UserSignupSchema";

// New User Signup Page
export function UserSignupPage() {
    const navigate = useNavigate();
    const [failureMessage, setFailureMessage] = useState("");

    let userSignupData = {
        userName:"",
        phone: "",
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
        initialValues: userSignupData,
        validationSchema: userSignupSchema,
        onSubmit: (values, {resetForm}) => {
            handleSignup(values);
            resetForm({values: ""});
        }
    });

    // SignUp Handling
    function handleSignup(userSignupPayload) {
        handleUserSignup(userSignupPayload)
        .then((data) => {
            if(data.error) {
                setFailureMessage(data.error);
            } else {
                setFailureMessage("");
                setTimeout(() => {
                    navigate("/user/login");
                },1000)
            }
        })
    };

    return (
        <>
            <NavBar />
            <PageHeader>
                <h2>User Signup</h2>
            </PageHeader>
            <div className="d-flex flex-column justify-content-center align-items-center mt-5 paper">
            <form className="d-flex flex-column justify-content-center align-items-center m-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="exampleInputusername" className="form-label">UserName</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputusername" 
                        aria-describedby="usernameHelp"
                        name="userName"
                        value={values.userName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.userName && errors.userName ?
                        (<div className="ps-2 text-start text-danger">{errors.userName}</div>)
                        :
                        ("")
                    }
                </div>

                <div className="mb-3">
                    <label for="mobileno" className="form-label">MobileNo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="mobileno" 
                        aria-describedby="mobileHelp"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.phone && errors.phone ?
                        (<div className="ps-2 text-start text-danger">{errors.phone}</div>)
                        :
                        ("")
                    }
                </div>

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

                <button type="submit" className="btn btn-primary mb-3">Signup</button>
            </form>
            </div>
            <div className="text-center">
                <span>Already Registered?  </span>
                <button className="btn btn-outline-primary"onClick={() => navigate("/user/login")}>Login</button>
            <div id="emailHelp" className="form-text">We'll never share your details with anyone else.</div>
            </div>

            {
                failureMessage ? (<div className="text-center text-danger">{failureMessage}</div>) : ("")
            }
        </>
    )
};

