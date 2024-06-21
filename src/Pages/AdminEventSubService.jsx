import { useState } from "react";
import { NavBar } from "../Components/NavBar";
import { PageHeader } from "../Components/PageHeader";
import { useAppContext } from "../Context/AppContext";
import { useFormik } from "formik";
import { eventSubServiceSchema } from "../Schemas/EventSubService";
import { getToken } from "../Authentication/auth";
import { adminurl, baseurl } from "../Handlers/BackendUrls";

export function AdminEventSubService() {
    const [successMessage, setSuccessMessage] = useState();
    const [failureMessage, setFailureMessage] = useState();

    const {eventSubServiceList, setEventSubServiceList, eventServiceList} = useAppContext();

    const subServiceData = {
        eventServiceId: "",
        subServiceName: "",
        subServiceDescription: ""
    };

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors
    } = useFormik({
        initialValues: subServiceData,
        validationSchema: eventSubServiceSchema,
        onSubmit: (values, {resetForm}) => {
            handleAddEventSubService(values);
            resetForm({values:""});
        }
    });

    // Adding Event Sub Service by Only
    function handleAddEventSubService(eventSubServiceData) {
        fetch(`${baseurl}/${adminurl}/master/add/eventsubservice`, {
            method: "POST",
            body: JSON.stringify(eventSubServiceData),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": getToken()
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if (data.error) {
                setFailureMessage(data.error);
                setSuccessMessage("");
            } else {
                setFailureMessage("");
                setSuccessMessage(data.message)
                setEventSubServiceList([...eventSubServiceList, data.data])
            }
        })
    };

    return (
        <>        
            <NavBar />
            <PageHeader>
                <h5>Event SubService</h5>
            </PageHeader>
            <form className="d-flex flex-column justify-content-center align-items-center m-2" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label" for="exampleeventServiceId" >Event Service Name</label>
                    <select
                        className="form-select border-2"
                        aria-label="Default select example"
                        name="eventServiceId"
                        value={values.eventServiceId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option default>Select Service</option>
                        {
                            eventServiceList.map((data, idx) => {
                                return <option key={idx} value={data._id}>{data.eventServiceName}</option>
                            })
                        }
                    </select>
                    {
                        touched.eventServiceId && errors.eventServiceId ?
                        (<div className="ps-2 text-danger">{errors.eventServiceId}</div>)
                        :
                        ("")
                    }
                </div>

                <div className="mb-3">
                    <label for="subServiceName" className="form-label">SubServiceName</label>
                    <input 
                        type="text"
                        className="form-control border-2"
                        id="subServiceName"
                        aria-describedby="subServiceNameHelp"
                        name="subServiceName"
                        value={values.subServiceName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.subServiceName && errors.subServiceName ?
                        (<div className="ps-2 text-danger">{errors.subServiceName}</div>) : ("")
                    }
                </div>

                <div className="mb-3">
                    <label for="subServiceDescription" className="form-label">SubServiceDescription</label>
                    <input 
                        type="text"
                        className="form-control border-2"
                        id="subServiceDescription"
                        aria-describedby="subServiceDescriptionHelp"
                        name="subServiceDescription"
                        value={values.subServiceDescription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.subServiceDescription && errors.subServiceDescription ?
                        (<div className="ps-2 text-danger">{errors.subServiceDescription}</div>)
                        :
                        ("")
                    }
                </div>
                <div className="form-text">Be Caution! Once Created Cannot Delete at present. Check Backend Also Before Adding and Below Report.</div>
                <button type="submit" className="btn">Save</button>
            </form>

            <div className="text-center">
                {failureMessage?(<div className="p-2 text-danger">{failureMessage}</div>):("")}
                {successMessage?(<div className="p-2 text-success">{successMessage}</div>):("")}
            </div>

            <hr />
            <div className="mb-2 text-center fs-4 fw-semibold">Already Exist Master Data</div>
            <table className="table table-success table-striped">
                <thead>
                    <tr>
                        <th>EventServiceName</th>
                        <th>SubServiceName</th>
                        <th>SubServiceDescription</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        eventSubServiceList.map((subservicedata, idx) => {
                            return <SubServiceCards key={idx} subservicedata={subservicedata} idx={idx} />
                        })
                    }
                </tbody>
            </table>
        </>
    )
};

function SubServiceCards({subservicedata}) {
    return (
        <tr className="">
            <td className="">{subservicedata.eventServiceId.eventServiceName}</td>
            <td className="">{subservicedata.subServiceName}</td>
            <td className="">{subservicedata.subServiceDescription}</td>
        </tr>
    )
};

