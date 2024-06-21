import { useNavigate } from "react-router-dom"
import { NavBar } from "../Components/NavBar";
import { useState } from "react";
import { useFormik } from "formik";
import { PageHeader } from "../Components/PageHeader";
import { useAppContext } from "../Context/AppContext";
import { userEventPlanMainSchema } from "../Schemas/UserEventPlanMain";
import { baseurl, userurl } from "../Handlers/BackendUrls";
import { getToken } from "../Authentication/auth";

// Main Event Planning Adding and Updating
export function UserEventPlanMain() {
    const navigate = useNavigate();
    const [failureMessage, setFailureMessage] = useState("");
    const [SuccessMessage, setSuccessMessage] = useState("");
    const {
        eventCategoryList, states, cities, show, setShow, editId, editIdx,
        userEventPlanMainData, userEventPlanMainList, setUserEventPlanMainList,
    } = useAppContext();

    let userEventPlanMainDataAdd = userEventPlanMainData;

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched
    } = useFormik({
        initialValues: userEventPlanMainDataAdd,
        validationSchema: userEventPlanMainSchema,
        onSubmit: (values, {resetForm}) => {
            if (show) {
                handleAddEventPlanMain(values);
            } else {
                handleUpdateEventPlanMain(values);
            }
            resetForm({values: ""});
        }
    });

    // Updating Event Planning Data by User
    function handleUpdateEventPlanMain(eventPlanMainPayload) {
        fetch(`${baseurl}/${userurl}/update/eventplanning/${editId}`, {
            method: "PUT",
            body: JSON.stringify(eventPlanMainPayload),
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
                // console.log(data);
                setFailureMessage("");
                setSuccessMessage(data.message);
                setShow(true);
                userEventPlanMainList[editIdx] = data.data;
                setTimeout(() => {
                    navigate("/user/eventplandashboard");
                },1000);
            }
        })
    };

    // Adding New Event Planning by User
    function handleAddEventPlanMain(eventPlanMainPayload) {
        fetch(`${baseurl}/${userurl}/add/eventplanning`, {
            method: "POST",
            body: JSON.stringify(eventPlanMainPayload),
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
                // console.log(data);
                setFailureMessage("");
                setSuccessMessage(data.message);
                setUserEventPlanMainList([...userEventPlanMainList, data.data]);
                setTimeout(() => {
                    navigate("/user/eventplandashboard");
                },1000);
            }
        })
    };

    return (
        <>
            <NavBar />
            <PageHeader>
                <h2>Event Planning Main Details</h2>
            </PageHeader>

            <div className="d-flex flex-column justify-content-center align-items-center mt-5 paper">
            <form className="row m-3" onSubmit={handleSubmit}>        

                <div className="col-md-4 mb-3">
                    <label for="exampleInputeventCategoryId" className="form-label">Select Event Category</label>
                    <select 
                    className="form-select" 
                    aria-label="Default select example"
                    name="eventCategoryId"
                    value={values.eventCategoryId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    >
                    <option default>Select Your Type of Event</option>
                        {
                            eventCategoryList.map((eventCategory, index) => {
                                return <option key={index} value={eventCategory._id}>{eventCategory.categoryName}</option>
                            })
                        }
                    </select>
                    {
                        touched.eventCategoryId && errors.eventCategoryId ?
                        (<div className="ps-2 text-start text-danger">{errors.eventCategoryId}</div>)
                        :
                        ("")
                    }
                </div>
                <div id="Help" className="form-text">Like Wedding, Reception, PreWedding</div>
                
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
                    <label for="date" className="form-label">Date</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        id="date" 
                        aria-describedby="dateHelp"
                        name="date"
                        value={values.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.date && errors.date ?
                        (<div className="ps-2 text-start text-danger">{errors.date}</div>)
                        :
                        ("")
                    }
                </div>

                <div className="col-md-4 mb-3">
                    <label for="startTime" className="form-label">Event StartTime</label>
                    <input 
                        type="time" 
                        className="form-control" 
                        id="startTime" 
                        aria-describedby="startTimeHelp"
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
                    <label for="endTime" className="form-label">Event EndTime</label>
                    <input 
                        type="time" 
                        className="form-control" 
                        id="endTime" 
                        aria-describedby="endTimeHelp"
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
                    <label for="expectedMemberCount" className="form-label">ExpectedMemberCount</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="expectedMemberCount" 
                        aria-describedby="expectedMemberCountHelp"
                        name="expectedMemberCount"
                        value={values.expectedMemberCount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.expectedMemberCount && errors.expectedMemberCount ?
                        (<div className="ps-2 text-start text-danger">{errors.expectedMemberCount}</div>)
                        :
                        ("")
                    }
                </div>

                <div className="col-md-4 mb-3">
                    <label for="budgetAmount" className="form-label">BudgetAmount</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="budgetAmount" 
                        aria-describedby="budgetAmountHelp"
                        name="budgetAmount"
                        value={values.budgetAmount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.budgetAmount && errors.budgetAmount ?
                        (<div className="ps-2 text-start text-danger">{errors.budgetAmount}</div>)
                        :
                        ("")
                    }
                </div>
                <div className="text-center">
                {
                    show ? 
                    (<button type="submit" className="btn btn-primary mb-3">Save</button>)
                    :
                    (<button type="submit" className="btn btn-primary mb-3">Update</button>)
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
