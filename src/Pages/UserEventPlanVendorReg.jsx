import { useNavigate } from "react-router-dom"
import { NavBar } from "../Components/NavBar";
import { useState } from "react";
import { useFormik } from "formik";
import { PageHeader } from "../Components/PageHeader";
import { useAppContext } from "../Context/AppContext";
import { baseurl, userurl } from "../Handlers/BackendUrls";
import { getToken } from "../Authentication/auth";
import { userPlanVendorRegSchema } from "../Schemas/UserEventPlanVendorReg";

// Event Services Planning Like Photograpy, Catering, Travels Services
export function UserEventPlanVendorReg() {
    const navigate = useNavigate();
    const [failureMessage, setFailureMessage] = useState("");
    const [SuccessMessage, setSuccessMessage] = useState("");
    const {vendors, eventServiceList, userEventPlanVendorRegData,
        userEventPlanRegList, setUserEventPlanRegList,
        show, setShow, editId, editIdx, mainEventId
    } = useAppContext();

    let userEventPlanVendorWiseRegDataAdd = {
        ...userEventPlanVendorRegData, 
        eventPlanMainId: mainEventId 
    };

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched
    } = useFormik({
        initialValues: userEventPlanVendorWiseRegDataAdd,
        validationSchema: userPlanVendorRegSchema,
        onSubmit: (values, {resetForm}) => {
            if (show) {
                handleAddEventPlanVendorRegister(values);
            } 
            else {
                handleUpdateEventPlanVendorRegister(values);
            }
            // resetForm({values: ""});
        }
    });

    // Updating Event Service Plan and Register with Vendor
    function handleUpdateEventPlanVendorRegister(eventPlanVendorPayload) {
        fetch(`${baseurl}/${userurl}/update/eventplanningvendor/${editId}`, {
            method: "PUT",
            body: JSON.stringify(eventPlanVendorPayload),
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
                userEventPlanRegList[editIdx] = data.data;
                setTimeout(() => {
                    navigate("/");
                    location.reload();
                    // navigate("/user/eventplandashboarddetailed");
                },1000)
            }
        })
    };

    // Adding New EventService Plan and Register with Vendor
    function handleAddEventPlanVendorRegister(eventPlanVendorPayload) {
        let registerdata
        if(values.registered == "") {
            registerdata = {
                ...eventPlanVendorPayload,
                registered: false,
            }
        } else {
            registerdata = {
                ...eventPlanVendorPayload,
            }
        }
        console.log("Actual",eventPlanVendorPayload)
        console.log("Modified",registerdata)
        fetch(`${baseurl}/${userurl}/add/eventplanningvendor/`, {
            method: "POST",
            body: JSON.stringify(registerdata),
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
                setUserEventPlanRegList([...userEventPlanRegList, data.data]);
                setTimeout(() => {
                    navigate("/user/eventplandashboarddetailed");
                },2000);
            }
        })
    };

    return (
        <>
            <NavBar />
            <PageHeader>
                <h2>Event Service Planning Vendor Wise and Registering</h2>
            </PageHeader>

            <div className="d-flex flex-column justify-content-center align-items-center mt-5 paper">
            <form className="row m-3" onSubmit={handleSubmit}>        

                <div className="col-md-4 mb-3">
                    <label for="examplevendorInputeventServiceId" className="form-label">Select Event Service</label>
                    <select 
                        className="form-select" 
                        aria-label="Default select example"
                        id="examplevendorInputeventServiceId"
                        name="eventServiceId"
                        value={values.eventServiceId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option default>Select Your Type of Event</option>
                        {
                            eventServiceList.map((eventService, index) => {
                                return <option key={index} value={eventService._id}>{eventService.eventServiceName}</option>
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
                    <label for="exampleInputplanvendorId" className="form-label">Select Vendor</label>
                    <select 
                        className="form-select" 
                        aria-label="Default select example"
                        id="exampleInputplanvendorId"
                        name="vendorId"
                        value={values.vendorId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option></option>
                        {
                            vendors
                            .filter((data) => data.eventServiceId._id == values.eventServiceId)
                            .map((fav, index) => {
                                return <option key={index} value={fav._id}>{fav.vendorName}</option>
                            })
                        }
                    </select>
                    {
                        touched.vendorId && errors.vendorId ?
                        (<div className="ps-2 text-start text-danger">{errors.vendorId}</div>)
                        :
                        ("")
                    }
                </div>

                <div className="col-md-4 mb-3">
                    <label for="vendorstartTime" className="form-label">Work StartTime</label>
                    <input 
                        type="time" 
                        className="form-control" 
                        id="vendorstartTime" 
                        aria-describedby="vendorstartTimeHelp"
                        name="startTime"
                        value={values.startTime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.startTime && errors.startTime ?
                        (<div className="ps-2 text-start text-danger">{errors.startTime}</div>)
                        :
                        ("")
                    }
                </div>

                <div className="col-md-4 mb-3">
                    <label for="vendorendTime" className="form-label">Work EndTime</label>
                    <input 
                        type="time" 
                        className="form-control" 
                        id="vendorendTime" 
                        aria-describedby="vendorendTimeHelp"
                        name="endTime"
                        value={values.endTime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.endTime && errors.endTime ?
                        (<div className="ps-2 text-start text-danger">{errors.endTime}</div>)
                        :
                        ("")
                    }
                </div>

                <div className="col-md-4 mb-3">
                    <label for="vendoramount" className="form-label">Amount</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="vendoramount" 
                        aria-describedby="vendoramountHelp"
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
                    <label for="plandescription" className="form-label">Description</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="plandescription" 
                        aria-describedby="plandescriptionHelp"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.description && errors.description ?
                        (<div className="ps-2 text-start text-danger">{errors.description}</div>)
                        :
                        ("")
                    }
                </div>

                <div className="text-center">
                    <div className="form-check">
                        {userEventPlanVendorRegData.registered ?
                            (   
                                <label className="form-check-label" for="flexCheckChecked">

                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    id="flexCheckChecked" 
                                    checked
                                    name="registered"
                                    // value=false
                                />
                                Register This Vendor for the Selected Service
                                </label>        
                            )
                            :
                            (
                                <label className="form-check-label" for="flexCheckDefault">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    id="flexCheckDefault"
                                    name="registered"
                                    value="true"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    default
                                />
                                Register This Vendor for the Selected Service
                                </label>
                            )
                        }
                        {
                            touched.registered && errors.registered ?
                            (<div className="ps-2 text-start text-danger">{errors.registered}</div>)
                            :
                            ("")
                        }
                    </div>
                    <div id="Help" className="form-text">Once Registered you cannot revert or Edit or Delete</div>
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
