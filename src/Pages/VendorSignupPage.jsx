import { useNavigate } from "react-router-dom";
import { NavBar } from "../Components/NavBar";
import { useState } from "react";
import { useFormik } from "formik";
import { PageHeader } from "../Components/PageHeader";
import { vendorSignupSchema } from "../Schemas/VendorSignupSchema";
import { handleVendorSignup } from "../Authentication/auth";
import { useAppContext } from "../Context/AppContext";

export function VendorSignupPage() {
    const navigate = useNavigate();
    const [failureMessage, setFailureMessage] = useState("");
    const {eventServiceList, states, cities, vendors, setVendors} = useAppContext();


    let vendorSignupData = {
        eventServiceId: "",
        vendorName: "",
        address: "",
        stateId: "",
        cityId: "",
        gstNo: "",
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
        initialValues: vendorSignupData,
        validationSchema: vendorSignupSchema,
        onSubmit: (values, {resetForm}) => {
            handleSignup(values);
            resetForm({values: ""});
        }
    });


    // Handling Vendor Signup Functionality
    function handleSignup(vendorSignupPayload) {
        handleVendorSignup(vendorSignupPayload)
        .then((data) => {
            if(data.error) {
                console.log(data.errorData);
                setFailureMessage(data.error);
            } else {
                setFailureMessage("");
                setVendors([...vendors, data.vendor]);
                setTimeout(() => {
                    navigate("/vendor/login");
                },1000);
            };
        })
    };

    return (
        <>
            <NavBar />
            <PageHeader>
                <h2>Vendor Signup</h2>
            </PageHeader>

            <div className="d-flex flex-column justify-content-center align-items-center mt-5 paper">
            <form className="row m-3" onSubmit={handleSubmit}>
                <div className="col-md-4 mb-3 ml-2">
                    <label for="exampleInputeventServiceId" className="form-label">Select Business Type</label>
                    <select 
                        className="form-select" 
                        aria-label="Default select example"
                        name="eventServiceId"
                        value={values.eventServiceId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option default>Open this select menu</option>
                        {
                            eventServiceList.map((eventservice, index) => {
                                return <option key={index} value={eventservice._id}>{eventservice.eventServiceName}</option>
                            })
                        }
                    </select>
                    {
                        touched.eventServiceId && errors.eventServiceId ?
                        (<div className="ps-2 text-start text-danger">{errors.eventServiceId}</div>)
                        :
                        ("")
                    }
                </div>
            
                <div className="col-md-4 mb-3">
                    <label for="exampleInputvendorname" className="form-label">Vendor/Business-Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputvendorname" 
                        aria-describedby="vendornameHelp"
                        name="vendorName"
                        value={values.vendorName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.vendorName && errors.vendorName ?
                        (<div className="ps-2 text-start text-danger">{errors.vendorName}</div>)
                        :
                        ("")
                    }
                </div>
                
                <div className="col-md-4 mb-3">
                    <label for="exampleInputvendoraddress" className="form-label">Address</label>
                    <textarea 
                        className="form-control" 
                        aria-label="With textarea"
                        id="exampleInputvendoraddress"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                    </textarea>
                    {
                        touched.address && errors.address ?
                        (<div className="ps-2 text-start text-danger">{errors.address}</div>)
                        :
                        ("")
                    }
                </div>

                <div className="col-md-4 mb-3">
                    <label for="exampleInputstateId" className="form-label">Select State</label>
                    <select 
                        className="form-select" 
                        aria-label="Default select example"
                        name="stateId"
                        value={values.stateId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option default>State menu</option>
                        {
                            states.map((state, index) => {
                                return <option key={index} value={state._id}>{state.stateName}</option>
                            })
                        }
                    </select>
                    {
                        touched.stateId && errors.stateId ?
                        (<div className="ps-2 text-start text-danger">{errors.stateId}</div>)
                        :
                        ("")
                    }
                </div>

                <div className="col-md-4 mb-3">
                    <label for="exampleInputcityId" className="form-label">Select City</label>
                    <select 
                        className="form-select" 
                        aria-label="Default select example"
                        name="cityId"
                        value={values.cityId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option default>City menu</option>
                        {
                            cities.filter((city) => city.stateId == values.stateId).map((city, index) => {
                                return <option key={index} value={city._id}>{city.cityName}</option>
                            })
                        }
                    </select>
                    {
                        touched.cityId && errors.cityId ?
                        (<div className="ps-2 text-start text-danger">{errors.cityId}</div>)
                        :
                        ("")
                    }
                </div>

                <div className="col-md-4 mb-3">
                    <label for="gstNo" className="form-label">GST No</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="gstNo" 
                        aria-describedby="gstNoHelp"
                        name="gstNo"
                        value={values.gstNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.gstNo && errors.gstNo ?
                        (<div className="ps-2 text-start text-danger">{errors.gstNo}</div>)
                        :
                        ("")
                    }
                </div>

                <div className="col-md-4 mb-3">
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

                <div className="col-md-4 mb-3">
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

                <div className="col-md-4 mb-3">
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

                <div className="col-md-4 mb-3">
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
                <div className="text-center">
                    <button type="submit" className="btn btn-primary mb-3">Signup</button>
                </div>
            </form>
            </div>
            <div className="text-center m-3">
                <span>Already Registered?  </span>
                <button className="btn btn-outline-primary"onClick={() => navigate("/user/login")}>Login</button>
                <div id="Help" className="form-text">We'll never share your personalDetails with anyone else.</div>
            </div>
            {
                failureMessage ? (<div className="text-center text-danger">{failureMessage}</div>) : ("")
            }
        </>
    )
};

