import { useNavigate } from "react-router-dom"
import { NavBar } from "../Components/NavBar";
import { PageHeader } from "../Components/PageHeader";
import { useFormik } from "formik";
import { useAppContext } from "../Context/AppContext";
import { userEventPaymentSchema } from "../Schemas/UserEventPayment";
import { baseurl, userurl } from "../Handlers/BackendUrls";
import { getToken } from "../Authentication/auth";
import { useState } from "react";

// Vendor Payment Page
export function UserVendorPayment() {
    const navigate = useNavigate();
    const [failureMessage, setFailureMessage] = useState("");
    const [SuccessMessage, setSuccessMessage] = useState("");
    const {userEventPaymentList, setUserEventPaymentList,
        userPaymentData, setShow, show, editId, editIdx 
    } = useAppContext();

    let initialPayData = {
        ...userPaymentData
    };

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors
    } = useFormik({
        initialValues: initialPayData,
        validationSchema:userEventPaymentSchema,
        onSubmit: (values, {resetForm}) => {
            if (show) {
                handleAddPayment(values)
            } else {
                handleUpdatePayment(values)
            }
            resetForm({values: ""});
        }
    });

    // Payment Entry Details Update button Handling
    function handleUpdatePayment(eventVendorPaymentPayload) {
        fetch(`${baseurl}/${userurl}/update/vendorpayment/${editId}`, {
            method: "PUT",
            body: JSON.stringify(eventVendorPaymentPayload),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": getToken()
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.error) {
                console.log(data.errorData);
                setFailureMessage(data.error);
                setSuccessMessage("");
            } else {
                setFailureMessage("");
                setSuccessMessage(data.message);
                setShow(false);    
                userEventPaymentList[editIdx] = data.data;
                setTimeout(() => {
                    navigate("/");
                    location.reload();
                },1000);
            };
        })
    };

    // Add New Payment Details- Save button Handling
    function handleAddPayment(eventVendorPaymentPayload) {
        fetch(`${baseurl}/${userurl}/add/vendorpayment`, {
            method: "POST",
            body: JSON.stringify(eventVendorPaymentPayload),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": getToken()
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.error) {
                console.log(data.errorData);
                setFailureMessage(data.error);
                setSuccessMessage("");
            } else {
                setFailureMessage("");
                setSuccessMessage(data.message);
                setUserEventPaymentList([...userEventPaymentList, data.data]);
                setTimeout(() => {
                    navigate("/user/eventplandashboarddetailed");
                },1000);
            };
        })
    };

    return (
        <>
            <NavBar />
            <PageHeader>
                <h2>Vendor Payment</h2>
            </PageHeader>

            <div className="d-flex flex-column justify-content-center align-items-center mt-5 paper">
            <form className="row g-3 mt-5" onSubmit={handleSubmit}> 

                <div className="col-md-4 mb-3">
                    <label for="examplepayType" className="form-label">Select Paid Method</label>
                    <select 
                        className="form-select" 
                        aria-label="Default select example"
                        id="examplepayType"
                        name="payType"
                        value={values.payType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option default>Select Payment Type</option>
                        <option value={"cash"}>cash</option>
                        <option value={"card"}>card</option>
                        <option value={"cheque"}>cheque</option>
                        <option value={"online"}>online</option>
                    </select>
                    {
                        touched.payType && errors.payType ?
                        (<div className="ps-2 text-start text-danger">{errors.payType}</div>)
                        :
                        ("")
                    }
                </div>              
                                
                <div className="col-md-4 mb-3">
                    <label for="paidDate" className="form-label">PaidDate</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        id="paidDate" 
                        aria-describedby="paidDateHelp"
                        name="paidDate"
                        value={values.paidDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.paidDate && errors.paidDate ?
                        (<div className="ps-2 text-start text-danger">{errors.paidDate}</div>)
                        :
                        ("")
                    }
                </div>

                <div className="col-md-4 mb-3">
                    <label for="paidamount" className="form-label">Amount Paid</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="paidamount" 
                        aria-describedby="paidamountHelp"
                        name="amount"
                        value={values.amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.amount && errors.amount ?
                        (<div className="ps-2 text-start text-danger">{errors.amount}</div>)
                        :
                        ("")
                    }
                </div>

                <div className="col-md-4 mb-3">
                    <label for="remarks" className="form-label">Remarks</label>
                    <textarea 
                        className="form-control" 
                        aria-label="With textarea"
                        id="remarks" 
                        name="remarks"
                        value={values.remarks}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                    </textarea>
                    {
                        touched.remarks && errors.remarks ?
                        (<div className="ps-2 text-start text-danger">{errors.remarks}</div>)
                        :
                        ("")
                    }
                </div>

                <div className="text-center">
                {
                    show ? 
                    (<button type="submit" className="btn mb-3">Save</button>)
                    :
                    (<button type="submit" className="btn mb-3">Update</button>)
                }
                </div>
            </form>
            </div>
            
            {
                failureMessage ? (<div className="text-center text-danger">{failureMessage}</div>) : ("")
            }
            {
                SuccessMessage ? (<div className="text-center text-success">{SuccessMessage}</div>) : ("")
            }
        </>
    )
};

