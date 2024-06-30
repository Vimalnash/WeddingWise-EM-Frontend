import { useNavigate } from "react-router-dom";
import { NavBar } from "../Components/NavBar";
import { PageHeader } from "../Components/PageHeader";
import { useAppContext } from "../Context/AppContext"
import { baseurl, userurl } from "../Handlers/BackendUrls";
import { getToken } from "../Authentication/auth";
import { useEffect, useState } from "react";

// Vendor Data Detailed Page View
function UserVendorDetailPage() {
    const {vendorId, vendors, userAllVendorPackageList} = useAppContext();
    const navigate = useNavigate();

    return (
        <div>
            <NavBar />
            <PageHeader>
                <h5 className="text-center">Vendor Details</h5>
            </PageHeader>
            <button className="text-success" onClick={() => navigate("/user/vendordashboard")}>&larr; Go Back</button>
            <div className="container m-30">
                <div className="row mt-10">
                    {
                        vendorId ?
                        (
                            vendors
                            .filter((vendor, idx) => vendor._id == vendorId)
                            .map((vendor, idx) => {
                                return <VendorCard key={idx} vendorData={vendor} idx={idx} />
                            })
                        )
                        :
                        ("")
                    }
                </div>
                
            </div>
        </div>
    )
};


// Vendor Details and Package Details, Images given by Vendor and Adding as user Fav.
function VendorCard({vendorData}) {
    const navigate = useNavigate();
    const [fav, setFav] = useState("");
    const {
        userFavourites, 
        setUserFavourites, 
        loggedInUser,
        userAllVendorPackageList,
        vendorPayTermsList
    } = useAppContext();
    
    useEffect(() => {
        userFavourites.map((data) => {
            if (data.vendorId._id == vendorData._id && data.userId.userName == loggedInUser) {
                setFav(data._id);
            }
        });
    }, [])

    // Handling the AddtoFavourites button
    function handleBtnFavourite() {
        const payload = {
            vendorId: vendorData._id
        };

        fetch(`${baseurl}/${userurl}/add/favouritevendor`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": getToken()
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if(data.error) {
                console.log(data.error);
            } else {
                const newFavArray = [...userFavourites, data.data];
                setUserFavourites(newFavArray);
                setFav("true");
                // navigate("/");
                // location.reload();
            }
        })
    };


    // Remove Favourites button functionality
    function removeFavourite(e, id) {
        e.preventDefault();
        // console.log("Remove", id);
        const confirmRemove = confirm("Confirm Remove?")
        confirmRemove ?
        (
        fetch(`${baseurl}/${userurl}/vendor/deletefavourite/${id}`, {
            method:"DELETE",
            headers: {
                "Content-Type":"application/json",
                "x-auth-token": getToken()
            }
        })
        .then((res) => res.json())
        .then((deletedData) => {
            console.log(deletedData);
            if(deletedData) {
                const newList = userFavourites.filter((data) => data._id != id)
                setUserFavourites(newList);
            }
            setFav("");
            // navigate("/");
            // location.reload();
        })
        )
        :
        (alert("Not Removed"))
    };


    return (
        <div className="mb-3 mb-sm-0">
            <div className="card shadow border-success mb-3 text-center">
                <div className="border-success">
                    <img 
                        src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hcnJpYWdlfGVufDB8fDB8fHww" 
                        className="img-thumbnail card-img-top bg-transparent border-success"
                        style={{height: "300px", width:"300px" }} 
                        alt="..." 
                    />
                </div>

                <div className="card-header bg-success p-2 fs-4 text-dark bg-opacity-25 fw-semibold border border-start-0 border-end-0 border-success">
                    {vendorData.vendorName}
                </div>
                <div className="card-header p-1 fs-5 text-dark bg-opacity-25 fw-semibold border border-start-0 border-end-0 border-success">
                    {`${vendorData.eventServiceId.eventServiceName} Services`} 
                </div>

                <div className="card-body text-success">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 mt-3 mb-3 mb-sm-0">
                                <div className="card shadow border-success mb-3 text-center">
                                    <div className="card-body bg-success text-dark bg-opacity-10">
                                        <p className="card-text d-flex align-items-center gap-2">
                                            <span className="material-symbols-outlined">home</span>
                                            {vendorData.address}
                                        </p>
                                        <p className="card-text d-flex align-items-center gap-2">
                                            <span className="material-symbols-outlined">call</span>
                                            {vendorData.phone}
                                        </p>
                                        <p className="card-text d-flex align-items-center gap-2">
                                            <span className="material-symbols-outlined">mail</span>
                                            {vendorData.email}
                                        </p>
                                        <p className="card-text d-flex align-items-center gap-2">
                                            <span className="material-symbols-outlined">flag</span>
                                            {vendorData.stateId.stateName}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-4 mt-3 mb-3 mb-sm-0">
                                <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                                    <div className="shadow d-flex justify-content-center align-items-center gap-2 bg-success p-2 text-dark text-success bg-opacity-25 fw-semibold border-success">
                                        <span className="material-symbols-outlined">star</span>{vendorData.rating} Star Rating
                                    </div>
                                    {
                                        fav ?
                                        (
                                            <>
                                            <button 
                                                className="btn btn-primary"
                                                onClick={handleBtnFavourite}
                                                disabled
                                            >
                                                Add to Favourites
                                            </button>
                                            <button 
                                                className="btn btn-del"
                                                onClick={(e) => {removeFavourite(e, fav)}}
                                            >
                                                Remove From Favouries
                                            </button>
                                            </>     
                                        )
                                        :
                                        (      
                                            <>
                                            <button 
                                                className="btn btn-primary"
                                                onClick={handleBtnFavourite}
                                            >
                                                Add to Favourites
                                            </button>
                                            <button 
                                                disabled
                                                className="btn btn-del"
                                                onClick={(e) => {removeFavourite(e, fav)}}
                                            >
                                                Remove From Favouries
                                            </button>
                                            </>                              
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-2 fs-6 text-dark bg-opacity-25 fw-semibold border border-start-0 border-end-0 border-success-subtle">
                        Base/Starting Package Details
                </div>
                
                <div className="card-body text-success">
                    <div className="container">
                        <div className="row d-flex flex-row">
                            {
                                userAllVendorPackageList
                                .filter((data) => data.vendorId._id == vendorData._id)
                                .map((data, idx) => {
                                    return <VendorPackageCard key={idx} data={data} idx={idx}/>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="p-2 fs-6 text-dark bg-opacity-25 fw-semibold border border-start-0 border-end-0 border-success-subtle">
                        Payment Terms
                </div>
                
                <div className="card-body text-success">
                    <div className="container">
                        <div className="row d-flex flex-row">
                            {
                                vendorPayTermsList
                                .filter((data) => data.vendorId._id == vendorData._id)
                                .map((data, idx) => {
                                    return <VendorPayTermsCard key={idx} data={data} idx={idx}/>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <button 
                        onClick={() => navigate("/user/vendordashboard")} 
                        className="shadow btn btn-primary border border-success m-2"
                    >
                        &larr;Go to Vendor Dashboard
                    </button>
                    <button 
                        onClick={() => navigate("/user/myfavouritevendors")} 
                        className="shadow btn btn-primary border border-success m-2"
                    >
                        &larr;Go to MyFavourites
                    </button>
                </div>
            </div>
        </div>
    )
};

// Vendor Package Card in Detail view
function VendorPackageCard({data, idx}) {
    return (
        <div className="col col-sm mt-3 mb-3 mb-sm-0">
            <div className="card shadow border-success mb-3 text-center">
                <div className="card-body bg-success text-dark bg-opacity-10">
                    <p className="card-text d-flex align-items-center gap-2">
                        <span className="material-symbols-outlined">currency_rupee_circle</span>
                        {Intl.NumberFormat('en-IN', {style: 'currency', currency: 'INR', minimumFractionDigits: 0}).format(data.serviceAmount)}/day
                    </p>
                    <p className="card-text d-flex align-items-center gap-2">
                        <span className="material-symbols-outlined">info</span>
                        {data.serviceDescription}
                    </p>
                </div>
            </div>
        </div>
    )
};

// VendorPaymentTerms in Detail View
function VendorPayTermsCard({data, idx}) {
    return (
        <div className="col col-sm mt-3 mb-3 mb-sm-0">
            <div className="card shadow border-success mb-3 text-center">
                <div className="card-body bg-success text-dark bg-opacity-10">
                    <p className="card-text d-flex align-items-center gap-2">
                        <span className="material-symbols-outlined">check_circle</span>
                        Advance Booking Payment - {data.advBookingPayPercent} %
                    </p>
                    <p className="card-text d-flex align-items-center gap-2">
                        <span className="material-symbols-outlined">check_circle</span>
                        On Event Date Payment - {data.onEventDatePayPercent} %
                    </p>
                    <p className="card-text d-flex align-items-center gap-2">
                        <span className="material-symbols-outlined">check_circle</span>
                        Post Event Payment - {data.postEventPayPercent} %
                    </p>
                    <p className="card-text d-flex align-items-center gap-2">
                        <span className="material-symbols-outlined">info</span>
                        Pay Terms Description - {data.payTermsDescription}
                    </p>
                    <p className="card-text d-flex align-items-center gap-2">
                        <span className="material-symbols-outlined text-warning">info</span>
                        InCase Cancel Terms Description - {data.cancelPolicyDescription}
                    </p>
                </div>
            </div>
        </div>
    )
};

export { UserVendorDetailPage };

