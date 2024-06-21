import { Link, useNavigate } from "react-router-dom";
import { handleUserLogout, handleVendorLogout, isAccessible, isAdmin, isVendor } from "../Authentication/auth";
import { useAppContext } from "../Context/AppContext";

export function NavBar() {
    const navigate = useNavigate();
    const {loggedInUser, loggedInVendor, 
        setShow, setUserEventPlanMainData,
        setServiceApplyStateIds, setVendorPackageData
    } = useAppContext();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">WeddingWise</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>

                    {
                        !isAccessible() && !isVendor() &&
                        (
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Vendors-BusinessSignup
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/vendor/signup">Register</Link></li>
                                <li><Link className="dropdown-item" to="/vendor/login">Login</Link></li>
                            </ul>
                        </li>
                        )
                    }
                    {
                        !isAccessible() && !isVendor() &&
                        (
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                User
                            </Link>
                            <ul className="dropdown-menu">
                                <li><button className="btn btn-outline-success m-2" onClick={() => navigate("/user/signup")}>Signup</button></li>
                                <li><button className="btn btn-outline-success m-2" onClick={() => navigate("/user/login")}>Login</button></li>
                            </ul>
                        </li>
                        )
                    }
                    {
                        isAccessible() && isVendor() &&
                        (
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Vendors
                            </Link>
                            <ul className="dropdown-menu">
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link 
                                        className="dropdown-item" 
                                        to="/vendor/packagedetails"
                                        onClick={() => {
                                            setVendorPackageData({
                                                eventServiceId: "",
                                                serviceAmount: "",
                                                serviceDescription: "",
                                                selectedStateId:"",
                                            })
                                            setServiceApplyStateIds([])
                                        }}
                                    >View Main Package Details
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link 
                                    className="dropdown-item" 
                                    to="/vendor/packageextradetails"
                                    >View Additional Packages
                                    </Link>
                                </li> */}
                                <li>
                                    <Link 
                                    className="dropdown-item" 
                                    to="/vendor/paymentterms"
                                    >View PayTerms
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        )
                    }
                    {
                        isAccessible() && !isVendor() &&
                        (
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Plan-Register-Pay
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/user/myfavouritevendors">My Favourite Vendors</Link></li>
                                <li>
                                    <Link 
                                    className="dropdown-item" 
                                    to="/user/add/eventplanning" onClick={() => {
                                        setUserEventPlanMainData({
                                            eventCategoryId: "",
                                            stateId: "",
                                            cityId: "",
                                            date: "",
                                            startTime: "",
                                            endTime: "",
                                            expectedMemberCount: "",
                                            budgetAmount: ""
                                        })
                                        setShow(true)
                                    }
                                    }
                                    >Event Plan Main Details
                                    </Link>
                                </li>
                                <li><Link className="dropdown-item" to="/user/eventplandashboard">Dashboard - Event Plan</Link></li>
                                <li><Link className="dropdown-item" to="/user/eventplandashboarddetailed">Dashboard - Event Plan Detailed View</Link></li>
                            </ul>
                        </li>

                        )
                    }
                    {
                        isAccessible() && !isVendor() &&
                        (
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/user/vendordashboard">VendorSearch</Link>
                        </li>
                        )
                    }
                    { 
                        isAccessible() && isAdmin() && 
                        (
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Admin
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/admin/master/eventcategory">EventCategory</Link></li>
                                <li><Link className="dropdown-item" to="/admin/master/eventservice">EventService</Link></li>
                                <li><Link className="dropdown-item" to="/admin/master/eventsubservice">EventSubService</Link></li>
                            </ul>
                        </li>
                        )
                    }

                </ul>
                <div className="d-flex flex-sm-nowrap flex-wrap gap-2">
                    {
                        isAccessible() && !isVendor() &&
                        (
                            <>
                                <span className="me-2"> Welcome {loggedInUser}! </span>
                                <button 
                                className="btn  btn-outline-success btnlogout" 
                                onClick={() => {navigate("/"); handleUserLogout(); }}
                            >
                                <span className="d-flex align-items-center gap-2">
                                    <span className="material-symbols-outlined">logout</span>
                                    <span>Logout</span>
                                </span>
                            </button>
                            </>
                        )
                    }
                    {
                        isAccessible() && isVendor() &&
                        (
                            <>
                            <span className="me-2"> Welcome {loggedInVendor}! </span>
                            <button 
                                className="btn  btn-outline-success btnlogout" 
                                onClick={() => {navigate("/"); handleVendorLogout(); }}
                            >
                                <span className="d-flex align-items-center gap-2">
                                    <span className="material-symbols-outlined">logout</span>
                                    <span>Logout</span>
                                </span>
                            </button>
                            </>
                        )
                    }
                </div>
                </div>
            </div>
            <div>

            </div>
        </nav>
    )
};

