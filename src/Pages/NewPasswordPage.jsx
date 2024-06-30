import { useState } from "react";
import { useFormik } from "formik";
import { PageHeader } from "../Components/PageHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { newPasswordSchema } from "../Schemas/newpassword";
import { useAppContext } from "../Context/AppContext";
import { handleUsersNewPass } from "../Authentication/auth";
import { NavBar } from "../Components/NavBar";

// New Password Setting
export function NewPasswordPage() {
    const navigate = useNavigate();
    const { setResetLink } = useAppContext();

    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Show Password Icon Button Hanlde
    function handleClickShowPassword() {
        setShowPassword(!showPassword);
    };

    // Prevent Mouse down click event
    function handleMouseDownPassword(e) {
        e.preventDefault();
    };

    const initialValue = {
        password: "",
        confirmPassword: ""
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
        validationSchema: newPasswordSchema,
        onSubmit: (values, {resetForm}) => {
            if (values.password == values.confirmPassword) {
                handleNewPass(values);
            } else {
                alert("Passwords did not match!")
            }
            resetForm({values: ""});
        }
    });

    // Getting hash from the url
    let location = useLocation();
    // console.log(location);
    // console.log("fullurl", window.location.href);
    const searchquery = new URLSearchParams(location.search).get("auth");

    function handleNewPass(newPassData) {
        handleUsersNewPass(newPassData, searchquery)
        .then((data) => {
            // console.log(data)
            if(data.error) {
                console.log(data.error);
                setFailureMessage(data.error);
                setSuccessMessage("");
            } else {
                setSuccessMessage(data.message);
                setFailureMessage("");
                setTimeout(()=> {
                    navigate("/user/login");
                    setResetLink("");
                }, 2000)
            }
        })
    };
    
    return (
        <>
        <NavBar />
        <PageHeader>
            <h2>Set New Password</h2>
        </PageHeader>
        <div className="d-flex flex-column justify-content-center align-items-center mt-5 paper">
        <form className="d-flex flex-column justify-content-center align-items-center mt-5" onSubmit={handleSubmit}>
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
            <div className="mb-3">
                <label for="exampleInputconfirmPassword1" className="form-label">ConfirmPassword</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="exampleInputconfirmPassword1"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // InputProps={{
                    //     endAdornment:
                    //         <button
                    //             aria-label="toggle password visibility"
                    //             onClick={handleClickShowPassword}
                    //             onMouseDown={handleMouseDownPassword}
                    //             edge="end"
                    //         >
                    //             {showPassword ? 
                    //             (<span class="material-symbols-outlined">visibility</span>) 
                    //             : 
                    //             (<span class="material-symbols-outlined">visibility_off</span>)
                    //             }
                    //         </button>
                        
                    // }}
                />
                {
                    touched.confirmPassword && errors.confirmPassword ?
                    (<div className="ps-2 text-start text-danger">{errors.confirmPassword}</div>)
                    :
                    ("")
                }
            </div>
            <button type="submit" className="btn">
                Save
            </button>
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

