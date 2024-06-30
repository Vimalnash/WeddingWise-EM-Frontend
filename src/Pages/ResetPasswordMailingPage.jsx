import { useState } from "react";
import { useFormik } from "formik";
import { PageHeader } from "../Components/PageHeader";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import { resetPasswordMailingSchema } from "../Schemas/resetpasswordmailing";
import { handleUserPasswordReset } from "../Authentication/auth";
import { NavBar } from "../Components/NavBar";

// Reset Password Link Mailing to User Regarding Page
export function ResetPasswordMailingPage() {
    const navigate = useNavigate();
    const {setResetLink} = useAppContext();
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");

    const initialValue = {
        email: "",
    };

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors
    } = useFormik({
        initialValues: initialValue,
        validationSchema: resetPasswordMailingSchema,
        onSubmit: (values, {resetForm}) => {
            handlePasswordReset(values);
            resetForm({values: ""});
        }
    });

    // Forgot Password Reset Link Mailing regarding
    function handlePasswordReset(resetLoginPass) {
        // console.log(resetLoginPass)
        handleUserPasswordReset(resetLoginPass)
        .then((data) => {
            // console.log(data);
            if(data.error) {
                console.log(data.error);
                setSuccessMessage("");
                setFailureMessage(data.error);
            } else {
                setFailureMessage("");
                setSuccessMessage(data.message);
                setResetLink(
                `/user/resetpasswordlink?auth=${data.passwordReset}`
                )
                navigate("/");
            }
        })
    };
    
    return (
        <>        
            <NavBar />
            <PageHeader>
                <h2>Reset Password</h2>
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

                <button type="submit" className="btn">
                    Send Reset Link
                </button>
                <button className="btn" onClick={() => navigate("/user/login")}>Back To Login</button>

                <div className="text-center">
                    {
                    successMessage ? (<div className="text-center text-success">{successMessage}</div>) : ("")
                    }
                    {
                        failureMessage ? (<div className="text-center text-danger">{failureMessage}</div>) : ("")
                    }
                </div>
                <div id="emailHelp" className="form-text">We'll never share your details with anyone else.</div>
            </form>
        </div>
    </>
    )
};

