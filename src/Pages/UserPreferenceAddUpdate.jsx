import { useNavigate } from "react-router-dom"
import { NavBar } from "../Components/NavBar";
import { useFormik } from "formik";
import { baseurl, userurl, vendorurl } from "../Handlers/BackendUrls";
import { getToken } from "../Authentication/auth";
import { useState } from "react";
import { PageHeader } from "../Components/PageHeader";
import { useAppContext } from "../Context/AppContext";
import { userEventPreferenceSchema } from "../Schemas/UserEventPrefernce";

export function UserPreferenceAddUpdate() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("")
    const [failureMessage, setFailureMessage] = useState("")
    const { editId, show, setShow, editIdx,
        userPreferenceList, setUserPreferenceList,
        userEventPreferenceData, setUserEventPreferenceData, 
        mainEventId,
    }= useAppContext();

    let initialPackageData = {
        ...userEventPreferenceData,
        eventPlanMainId: mainEventId
    }

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors
    } = useFormik({
        initialValues: initialPackageData,
        validationSchema: userEventPreferenceSchema,
        onSubmit: (values, {resetForm}) => {
            if (show) {
                addUserPrefernce(values);
            } else {
                updateUserPrefernce(values);
            }
            resetForm({values: ""});
        }
    });

    // Updating the User Preference Data
    function updateUserPrefernce(editPreferenceData) {

        fetch(`${baseurl}/${userurl}/update/preference/${editId}`, {
            method: "PUT",
            body: JSON.stringify(editPreferenceData),
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
                setShow(true);
                setFailureMessage("");
                setSuccessMessage(updatedData.message);
                setUserEventPreferenceData({
                    eventPlanMainId: "",
                    preferenceDesc: ""
                });
                userPreferenceList[editIdx] = updatedData.data;

                setTimeout(() => {
                    navigate("/");
                }, 1000);
            };
        })
    };


    // Adding New UserPreference Data
    function addUserPrefernce(addPreferenceData) {
        console.log(addPreferenceData);
        fetch(`${baseurl}/${userurl}/add/preference`, {
            method: "POST",
            body: JSON.stringify(addPreferenceData),
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
                setUserPreferenceList([...userPreferenceList, addedData.data]);  
                setTimeout(() => {
                    navigate("/user/eventplandashboarddetailed");
                }, 2000);
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
                    <label for="examplepreferenceDesc" className="form-label">PreferenceDescription</label>
                    <textarea 
                        className="form-control" 
                        aria-label="With textarea"
                        id="examplepreferenceDescn"
                        name="preferenceDesc"
                        value={values.preferenceDesc}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                    </textarea>
                    {
                        touched.preferenceDesc && errors.preferenceDesc ?
                        (<div className="ps-2 text-start text-danger">{errors.preferenceDesc}</div>)
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

