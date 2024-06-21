import { useNavigate } from "react-router-dom";
import { NavBar } from "../Components/NavBar";
import { PageHeader } from "../Components/PageHeader";

export function LandingPage() {
    const navigate = useNavigate();
    return (
        <>
            <NavBar />
            <PageHeader>
                <h2>Welcome to Wedding Wise</h2>
            </PageHeader>
            <div className="d-flex flex-column ">
                <div className="d-flex flex-sm-nowrap flex-wrap h-300 lh-lg usersign">
                    <p>
                        Signup Free and Shortlist your favourite Vendor from your locality and <br />
                        Plan Based on Your Budget and Finalize and RegisterConfirm your Events, <br />
                        Log your event Payments and track. <br />
                    </p>
                    <p>Choose From Exclusive Event Service Providers, Based on your Budget</p>
                    <button className="btn btn-outline-warning" onClick={() => navigate("/user/signup")}>Signup</button>
                </div>
                <div className="d-flex flex-sm-nowrap flex-wrap lh-lg h-300 usersign">
                    <p>
                        Then Signup<br />
                        <button className="btn btn-outline-warning" onClick={() => navigate("vendor/signup")}>Signup</button>
                    </p>
                    <p>
                        Are you a wedding event service provider <br />
                        Ready to Grow Your Business! <br />
                        Want to Reach your business throughout India!
                    </p>
                </div>
            </div>

        </>
    )
}