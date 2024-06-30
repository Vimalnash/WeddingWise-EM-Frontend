import { useNavigate } from "react-router-dom";
import { NavBar } from "../Components/NavBar";
import { PageHeader } from "../Components/PageHeader";
import { SearchBar } from "../Components/SearchBar";
import { useAppContext } from "../Context/AppContext";

// User Favourite Vendors Page
function UserMyFavouriteVendors() {
    const {searchVendorName, searchState, userFavourites} = useAppContext();
    
    return (
        <div>
            <NavBar />
            <PageHeader>
                <h5 className="text-center">My Favourite Vendors</h5>
            </PageHeader>
            <SearchBar />
            <div className="container m-30">
                <div className="row mt-10">
                    {
                        searchVendorName || searchState ?
                        (
                            userFavourites
                            .filter((vendor, idx) => vendor.vendorId.vendorName.toLowerCase().substr(0,searchVendorName.length) === searchVendorName.toLowerCase()) 
                            .filter((vendor, idx) => {
                                if (searchState == "") {
                                    return vendor
                                } else {
                                    return vendor.vendorId.stateId._id == searchState
                                }
                            })                                
                            .map((vendor, idx) => {
                                console.log(vendor)
                                return <VendorCard key={idx} vendorData={vendor.vendorId} idx={idx} />
                            })
                        )
                        :
                        (    
                            userFavourites.map((vendor, idx) => {
                                return <VendorCard key={idx} vendorData={vendor.vendorId} idx={idx}/>
                            })
                        )
                    }
                </div>
            </div>
        </div>
    )
};

// User Favourite Vendor Cards Creation
function VendorCard({vendorData}) {
    console.log(vendorData)
    const navigate = useNavigate();
    const {setVendorId, userAllVendorPackageList} = useAppContext();

    return (
        <div className="col-sm-6 mt-3 mb-3 mb-sm-0">
            <div className="card shadow border-success mb-3 text-center">
                <div className="card-header bg-success p-2 fs-4 text-dark bg-opacity-25 fw-semibold border-success">{vendorData.vendorName}</div>
                <div className="card-body bg-success text-dark bg-opacity-10">
                <p className="card-title  d-flex justify-content-center gap-2">{vendorData.eventServiceId.eventServiceName} Services</p>
                    <p className="card-text d-flex align-items-center gap-2">
                        <span className="material-symbols-outlined">home</span>
                        {vendorData.address}
                    </p>
                    <p className="card-text d-flex align-items-center gap-2">
                        <span class="material-symbols-outlined">call</span>
                        {vendorData.phone}
                    </p>
                    <p className="card-text d-flex align-items-center gap-2">
                        <span class="material-symbols-outlined">mail</span>
                        {vendorData.email}
                    </p>
                    <p className="card-text d-flex align-items-center gap-2">
                        <span class="material-symbols-outlined">flag</span>
                        {vendorData.stateId.stateName}
                    </p>
                    <p  className="card-text d-flex align-items-center gap-2">
                        {
                            userAllVendorPackageList
                            .filter((data) => data.vendorId._id == vendorData._id)
                            .map((data, idx) => {
                                return <VendorPackageCard key={idx} data={data} idx={idx}/>
                            })
                        }
                    </p>

                    <button 
                        className="btn btn-primary"
                        onClick={() => {
                            setVendorId(vendorData._id);
                            navigate(`/user/vendordashboard/detailed/${vendorData._id}`);
                        }} 
                    >
                        View Details
                    </button>
                </div>
                <div className="card-footer d-flex justify-content-center align-items-center gap-2 bg-success p-2 text-dark text-success bg-opacity-25 fw-semibold border-success">
                    <span class="material-symbols-outlined">star</span>{vendorData.rating} Star Rating
                </div>
            </div>
        </div>
    )
};


// To Show Base Budget quoted by vendor to user
function VendorPackageCard({data, idx}) {
    return (
        <>
            <span className="material-symbols-outlined fw-semibold">currency_rupee_circle</span>
            {Intl.NumberFormat('en-IN', {style: 'currency', currency: 'INR', minimumFractionDigits: 0}).format(data.serviceAmount)}/day
        </>
    )
};
export { UserMyFavouriteVendors };