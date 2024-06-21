
import { NavBar } from "../Components/NavBar";
import { PageHeader } from "../Components/PageHeader";
import { useState } from "react";
import { useFormik } from "formik";
import { eventCategorySchema } from "../Schemas/EventCategory";
import { adminurl, baseurl } from "../Handlers/BackendUrls";
import { useAppContext } from "../Context/AppContext";
import { getToken } from "../Authentication/auth";

export function AdminEventCategory() {

    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    
    const {eventCategoryList, setEventCategoryList} = useAppContext();

    const newCatName = {
        categoryName: ""
    };

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched
    } = useFormik({
        initialValues: newCatName,
        validationSchema: eventCategorySchema,
        onSubmit: (values, {resetForm}) => {
            addEventCategory(values);
            resetForm({values: ""})
        }
    });

    // Adding Event Category by Admin Only
    function addEventCategory(newEventCatName) {
        fetch(`${baseurl}/${adminurl}/master/add/eventcategory`, {
            method: "POST",
            body: JSON.stringify(newEventCatName),
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
                setEventCategoryList([...eventCategoryList, addedData.data]);
                setSuccessMessage(addedData.message);
                setFailureMessage("");
            };
        })
    };

    return (
        <>
            <NavBar />
            <PageHeader>
                <h5 className="text-center">Event Category</h5>
            </PageHeader>
            <form className="d-flex flex-column justify-content-center align-items-center mt-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="categoryName" className="form-label">EventCategoryName</label>
                    <input 
                        type="text" 
                        className="form-control border-2" 
                        id="categoryName"
                        aria-describedby="categoryNameHelp"
                        name="categoryName"
                        value={values.categoryName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        touched.categoryName && errors.categoryName ?
                        (<div className="pl-4 text-start text-danger">{errors.categoryName}</div>)
                        :
                        ("")
                    }
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <div className="form-text">Be Caution! Once Created Cannot Delete at present. Check Backend Also Before Adding and Below Report</div>
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
                <div className="mb-2 text-center fs-4 fw-semibold">Already Available Category Names List</div>
                <div className="d-flex flex-row gap-3 justify-content-center">
                    {
                        eventCategoryList.map((data, idx) => {
                            return <CategoryCard key={idx} data={data} idx={idx} />
                        })
                    }
                </div>
            </div>
        </>
    )
};

function CategoryCard({data}) {
    return (
            <div className="m-2 p-3 shadow border bg-success bg-opacity-25">{data.categoryName}</div>
    )
};