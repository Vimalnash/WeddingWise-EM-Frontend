import { useNavigate } from "react-router-dom"
import { NavBar } from "../Components/NavBar";
import { useFormik } from "formik";
import { baseurl, vendorurl } from "../Handlers/BackendUrls";
import { getToken } from "../Authentication/auth";
import { useState } from "react";
import { PageHeader } from "../Components/PageHeader";
import { useAppContext } from "../Context/AppContext";
import { vendorPayTermsSchema } from "../Schemas/VendorPayTermsSchema";

export function VendorPayTermsAddUpdate() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("")
    const [failureMessage, setFailureMessage] = useState("")
    const { states, editId, show, setShow, editIdx,
        vendorPayTermsList, setVendorPayTermsList,
        vendorPayTermsData, setVendorPayTermsData, loggedInVendorData,
    }= useAppContext();

    let initialPayTermsData = {
        ...vendorPayTermsData
    };

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors
    } = useFormik({
        initialValues: initialPayTermsData,
        validationSchema: vendorPayTermsSchema,
        onSubmit: (values, {resetForm}) => {
            if (show) {
                addVendorPayTerms(values);
            } else {
                updateVendorPayTerms(values);
            }
            resetForm({values: ""});
        }
    });



    // Updating the Vendor Payment Terms DAta
    function updateVendorPayTerms(editPayTermsData) {
        // console.log(editPayTermsData)
        fetch(`${baseurl}/${vendorurl}/update/paymentterms/${editId}`, {
            method: "PUT",
            body: JSON.stringify(editPayTermsData),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": getToken()
            }
        })
        .then((res)=> res.json())
        .then((updatedData) => {
            if (updatedData.error) {
                console.log(updatedData.error);
                setFailureMessage(updatedData.error);
                setSuccessMessage("");
            } else {
                console.log(updatedData)
                setShow(true);
                setFailureMessage("");
                setSuccessMessage(updatedData.message);
                setVendorPayTermsData({
                    advBookingPayPercent: "",
                    onEventDatePayPercent: "",
                    postEventPayPercent: "",
                    payTermsDescription: "",
                    cancelPolicyDescription: ""
                });
                vendorPayTermsList[editIdx] = updatedData.data;
                setTimeout(() => {
                    navigate("/vendor/paymentterms");
                }, 1000);
            };
        })
    };


    // Adding New Vendor Payment Terms Data
    function addVendorPayTerms(addPayTermsData) {
        // console.log(addPayTermsData);
        fetch(`${baseurl}/${vendorurl}/add/paymentterms`, {
            method: "POST",
            body: JSON.stringify(addPayTermsData),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": getToken()
            }
        })
        .then((res) => res.json())
        .then((addedData) => {
            console.log(addedData);
            if(addedData.error) {
                console.log(addedData.error);
                setFailureMessage(addedData.error);
                setSuccessMessage("");
            } else {
                setFailureMessage("");
                setSuccessMessage(addedData.message);
                setVendorPayTermsList([...vendorPayTermsList, addedData.data]);  
                setTimeout(() => {
                    navigate("/vendor/paymentterms");
                }, 1000);
            };
        })
    };

    return (
        <>
            <NavBar />
            <PageHeader>
                <h4>Vendor Package Form</h4>
            </PageHeader>

            <div className="d-flex flex-column justify-content-center align-items-center paper">
            <form className="p-2 " onSubmit={handleSubmit}>
                
                <div className=" mb-3">
                    <label for="advBookingPayPercent" className="form-label">Enter AdvBookingPayPercent</label>
                    <input
                        type="number"
                        className="form-control"
                        id="advBookingPayPercent"
                        aria-describedby="advBookingPayPercentHelp"
                        name="advBookingPayPercent"
                        value={values.advBookingPayPercent}
                        onChange={handleChange}
                        onBlur={handleBlur}                    
                    />
                    {
                        touched.advBookingPayPercent && errors.advBookingPayPercent ?
                        (<div className="ps-2 text-start text-danger">{errors.advBookingPayPercent}</div>)
                        :
                        ("")
                    }
                </div>

                <div className=" mb-3">
                    <label for="onEventDatePayPercent" className="form-label">Enter OnEventDatePayPercent</label>
                    <input
                        type="number"
                        className="form-control"
                        id="onEventDatePayPercent"
                        aria-describedby="onEventDatePayPercentHelp"
                        name="onEventDatePayPercent"
                        value={values.onEventDatePayPercent}
                        onChange={handleChange}
                        onBlur={handleBlur}                    
                    />
                    {
                        touched.onEventDatePayPercent && errors.onEventDatePayPercent ?
                        (<div className="ps-2 text-start text-danger">{errors.onEventDatePayPercent}</div>)
                        :
                        ("")
                    }
                </div>

                <div className=" mb-3">
                    <label for="postEventPayPercent" className="form-label">Enter PostEventPayPercent</label>
                    <input
                        type="number"
                        className="form-control"
                        id="postEventPayPercent"
                        aria-describedby="postEventPayPercentHelp"
                        name="postEventPayPercent"
                        value={values.postEventPayPercent}
                        onChange={handleChange}
                        onBlur={handleBlur}                    
                    />
                    {
                        touched.postEventPayPercent && errors.postEventPayPercent ?
                        (<div className="ps-2 text-start text-danger">{errors.postEventPayPercent}</div>)
                        :
                        ("")
                    }
                </div>
                <div className=" mb-3">
                    <label for="examplepayTermsDescription" className="form-label">Enter PayTermsDescription</label>
                    <textarea 
                        className="form-control" 
                        aria-label="With textarea"
                        id="examplepayTermsDescription"
                        name="payTermsDescription"
                        value={values.payTermsDescription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                    </textarea>
                    {
                        touched.payTermsDescription && errors.payTermsDescription ?
                        (<div className="ps-2 text-start text-danger">{errors.payTermsDescription}</div>)
                        :
                        ("")
                    }
                </div>

                <div className=" mb-3">
                    <label for="examplecancelPolicyDescription" className="form-label">Enter CancelTerms</label>
                    <textarea 
                        className="form-control" 
                        aria-label="With textarea"
                        id="examplecancelPolicyDescription"
                        name="cancelPolicyDescription"
                        value={values.cancelPolicyDescription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                    </textarea>
                    {
                        touched.cancelPolicyDescription && errors.cancelPolicyDescription ?
                        (<div className="ps-2 text-start text-danger">{errors.cancelPolicyDescription}</div>)
                        :
                        ("")
                    }
                </div>

                <div className="text-center mb-3">
                    {
                        show ?
                        (<button type="submit" className="btn">Save</button>)
                        :
                        (<button type="submit" className="btn">Update</button>)
                    }
                </div>
            </form>
            </div>

            <div className="text-center">
                {successMessage? (<div className="text-center text-success">{successMessage}</div>):("")}
                {failureMessage? (<div className="text-center text-danger">{failureMessage}</div>):("")}
            </div>
        </>
    )
};

