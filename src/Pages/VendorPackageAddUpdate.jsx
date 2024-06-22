import { useNavigate } from "react-router-dom"
import { NavBar } from "../Components/NavBar";
import { useFormik } from "formik";
import { baseurl, vendorurl } from "../Handlers/BackendUrls";
import { getToken } from "../Authentication/auth";
import { useState } from "react";
import { PageHeader } from "../Components/PageHeader";
import { useAppContext } from "../Context/AppContext";
import { vendorPackageSchema } from "../Schemas/VendorPackage";
import { VendorPackage } from "./VendorPackage";

export function VendorPackageAddUpdate() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("")
    const [failureMessage, setFailureMessage] = useState("")
    const { states, editId, show, setShow, editIdx,
        vendorPackageList, setVendorPackageList, 
        vendorPackageData, loggedInVendorData, setVendorPackageData,
        serviceApplyStateIds, setServiceApplyStateIds
    }= useAppContext();

    let initialPackageData = {
        ...vendorPackageData,
        eventServiceId: loggedInVendorData.eventServiceId
    };

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors
    } = useFormik({
        initialValues: initialPackageData,
        validationSchema: vendorPackageSchema,
        onSubmit: (values, {resetForm}) => {
            if (show) {
                addVendorPackage(values);
            } else {
                updateVendorPackage(values);
            }
            resetForm({values: ""});
        }
    });

    // This State and Functionality is to MultiSelect States by Vendor
    function applySelectedState() {
        // e.preventDefault();
        if (serviceApplyStateIds.length <= 0) {
            setServiceApplyStateIds([values.selectedStateId]);
        } else {
            for (let i=0; i<serviceApplyStateIds.length; i++) {
                if (serviceApplyStateIds[i] !== values.selectedStateId) {
                    if((serviceApplyStateIds.length-1) == i )
                        setServiceApplyStateIds([...serviceApplyStateIds, values.selectedStateId])
                } else {
                    break;
                };
            }
        };
    };


    // This Loop is to Get the StateNames of Selected State Ids,
    // to diplay in view
    let stateNames = []
    for (let i=0;i<serviceApplyStateIds.length; i++) {
        for (let j=0; j<states.length; j++) {
            if(serviceApplyStateIds[i] == states[j]._id) {
                stateNames.push(states[j].stateName)
            }
        }
    };

    // Updating the VendorServicePackage Data
    function updateVendorPackage(editPackageData) {
        // Destructuring
        const {eventServiceId, serviceAmount, serviceDescription} = editPackageData;

        const pushEditPackageData = {
            eventServiceId, 
            serviceAmount, 
            serviceDescription,
            serviceApplyStateIds
        };

        fetch(`${baseurl}/${vendorurl}/update/packagedetails/${editId}`, {
            method: "PUT",
            body: JSON.stringify(pushEditPackageData),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": getToken()
            }
        })
        .then((res)=> res.json())
        .then((updatedData) => {
            // console.log(updatedData);
            if (updatedData.error) {
                console.log(updatedData.error);
                setFailureMessage(updatedData.error);
                setSuccessMessage("");
            } else {
                setShow(true);
                setFailureMessage("");
                setSuccessMessage(updatedData.message);
                setVendorPackageData({
                    eventServiceId: "",
                    serviceAmount: "",
                    serviceDescription: "",
                    selectedStateId:"",
                });
                setServiceApplyStateIds([]);
                vendorPackageList[editIdx] = updatedData.data;

                setTimeout(() => {
                    navigate("/vendor/packagedetails");
                }, 1000);
            };
        })
    };


    // Adding New VendorServicePackage Data
    function addVendorPackage(addPackageData) {

        // Destructuring
        const {eventServiceId, serviceAmount, serviceDescription} = addPackageData;

        const pushPackageData = {
            eventServiceId, 
            serviceAmount, 
            serviceDescription,
            serviceApplyStateIds
        };
        // console.log(pushPackageData);
        fetch(`${baseurl}/${vendorurl}/add/packagedetails`, {
            method: "POST",
            body: JSON.stringify(pushPackageData),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": getToken()
            }
        })
        .then((res) => res.json())
        .then((addedData) => {
            // console.log(addedData);
            if(addedData.error) {
                console.log(addedData.error);
                setFailureMessage(addedData.error);
                setSuccessMessage("");
            } else {
                setFailureMessage("");
                setSuccessMessage(addedData.message);
                setVendorPackageList([...vendorPackageList, addedData.data]);  
                setTimeout(() => {
                    navigate("/vendor/packagedetails");
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
            {/* <center className=""> */}
            <form className="p-2 " onSubmit={handleSubmit}>
                
                <div className=" mb-3">
                    <label for="serviceAmount" className="form-label">Enter Base/Start Package/Service Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        id="serviceAmount"
                        aria-describedby="serviceAmountHelp"
                        name="serviceAmount"
                        value={values.serviceAmount}
                        onChange={handleChange}
                        onBlur={handleBlur}                    
                    />
                    {
                        touched.serviceAmount && errors.serviceAmount ?
                        (<div className="ps-2 text-start text-danger">{errors.serviceAmount}</div>)
                        :
                        ("")
                    }
                </div>

                <div className=" mb-3">
                    <label for="exampleserviceDescription" className="form-label">ServiceDescription</label>
                    <textarea 
                        className="form-control" 
                        aria-label="With textarea"
                        id="exampleserviceDescription"
                        name="serviceDescription"
                        value={values.serviceDescription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                    </textarea>
                    {
                        touched.serviceDescription && errors.serviceDescription ?
                        (<div className="ps-2 text-start text-danger">{errors.serviceDescription}</div>)
                        :
                        ("")
                    }
                </div>

                <div className=" mb-3">
                    <label for="exampleInputselectedStateId" className="form-label">Select State</label>
                    <select 
                        className="form-select" 
                        aria-label="Default select example"
                        name="selectedStateId"
                        value={values.selectedStateId}
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
                    <button className="btnsel btn-small" type="button" onClick={applySelectedState}>AddSelectedState</button>
                    {
                        touched.selectedStateId && errors.selectedStateId ?
                        (<div className="ps-2 text-start text-danger">{errors.selectedStateId}</div>)
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
            {/* </center> */}
            </div>
            <div className="text-center">
                SelectedStates: 
                {`"${stateNames}"`}
            </div>

            <div className="text-center">
                {successMessage? (<div className="text-center text-success">{successMessage}</div>):("")}
                {failureMessage? (<div className="text-center text-danger">{failureMessage}</div>):("")}
            </div>
        </>
    )
};

