
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { handleResetPassVerifyLink } from "../Authentication/auth";

// Reset Password Link Handling When User Clicks
export function ResetPassVerifyLinkPage() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");
    const [Loading, setLoading] = useState(true);


    let location = useLocation();
    const searchquery = new URLSearchParams(location.search).get("auth");

    useEffect(() => {
        handleResetPassVerifyLink(searchquery)
        .then((data) => {
            // console.log(data)
            if(data.error) {
                console.log(data.error);
                setTimeout(() => {
                    setLoading(false);
                    setSuccessMessage("");
                    setFailureMessage(data.error);
                }, 3000)
            } else {
                setTimeout(()=> {
                    setLoading(false);
                    setFailureMessage("");
                    setSuccessMessage(data.message);
                    navigate(`/user/resetpassword/setnewpassword?auth=${searchquery}`);
                }, 3000)
            }
        })
    }, []);

    return (
        <>
            <div style={{textAlign:"center"}}>
                {   Loading && (
                    <h3 className="text-center text-success">Processing Please Wait ...</h3>
                )}

                {
                    successMessage ? (<div className="text-center text-success">{successMessage}</div>) : ("")
                }
                {
                    failureMessage ? (<div className="text-center text-danger">{failureMessage}</div>) : ("")
                }
            </div>
        </>
    )
};

