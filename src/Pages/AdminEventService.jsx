
import { NavBar } from "../Components/NavBar";
import { PageHeader } from "../Components/PageHeader";
import { useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { useFormik } from "formik";
import { eventServiceSchema } from "../Schemas/EventService";
import { adminurl, baseurl } from "../Handlers/BackendUrls";
import { getToken } from "../Authentication/auth";

export function AdminEventService() {

    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    
    const {eventServiceList, setEventServiceList} = useAppContext();

    const newServiceName = {
        eventServiceName: ""
    };

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched
    } = useFormik({
        initialValues: newServiceName,
        validationSchema: eventServiceSchema,
        onSubmit: (values, {resetForm}) => {
            addEventService(values);
            resetForm({values: ""})
        }
    });

    // Adding Event Service by Admin Only
    function addEventService(newEventServiceName) {
        fetch(`${baseurl}/${adminurl}/master/add/eventservice`, {
            method: "POST",
            body: JSON.stringify(newEventServiceName),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": getToken()
            }
        })
        .then((res) => res.json())
        .then((addedData) => {
            if (addedData.error) {
                setFailureMessage(addedData.error);
                setSuccessMessage("");
            } else {
                setEventServiceList([...eventServiceList, addedData.data]);
                setSuccessMessage(addedData.message);
                setFailureMessage("");
            }
        })
    };

    return (
        <>
            <NavBar />
            <PageHeader>
                <h5 className="text-center">Event Service</h5>
            </PageHeader>
            <form className="d-flex flex-column justify-content-center align-items-center mt-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="eventServiceName" className="form-label">EventServiceName</label>
                    <input 
                        type="text" 
                        className="form-control border-2" 
                        id="eventServiceName"
                        aria-describedby="eventServiceNameHelp"
                        name="eventServiceName"
                        value={values.eventServiceName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.eventServiceName && errors.eventServiceName ?
                        (<div className="pl-4 text-start text-danger">{errors.eventServiceName}</div>)
                        :
                        ("")
                    }
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <div className="form-text">Be Caution! Once Created Cannot Delete at present. Check Backend Also Before Adding and Below Report </div>
            </form>
            <div className="p-2 text-center">
                {
                    successMessage ?
                    (<div className="text-center fw-semibold text-success">{successMessage}</div>):("")
                }
                {
                    failureMessage ?
                    (<div className="text-center fw-semibold text-danger">{failureMessage}</div>):("")
                }
            </div>
            <hr />
            <div>
                <div className="mb-2 text-center fs-4 fw-semibold">Already Exist Service Names List</div>
                <div className="d-flex flex-row gap-3 justify-content-center">
                    {
                        eventServiceList.map((data, idx) => {
                            return <ServiceNameCard key={idx} data={data} idx={idx} />
                        })
                    }
                </div>
            </div>
        </>
    )
};

function ServiceNameCard({data}) {
    return (
            <div className="m-2 p-2 shadow border-success bg-success bg-opacity-25">{data.eventServiceName}</div>
    )
}