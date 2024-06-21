import { useNavigate } from "react-router-dom"
import { useAppContext } from "../Context/AppContext";
import { NavBar } from "../Components/NavBar";
import { PageHeader } from "../Components/PageHeader";

export function VendorPackage() {
    const navigate = useNavigate();
    const { vendorPackageList
    }= useAppContext();

    return (
        <>
            <NavBar />
            <PageHeader>
                <h4>Vendor Package View</h4>
            </PageHeader>
            <hr />
            <div>
                {
                    vendorPackageList.length<0 ?
                    (
                        <>
                            <button 
                                type="button" 
                                className="btn" 
                                onClick={() => navigate("/vendor/add/packagedetails")}
                            >
                                Add
                            </button>
                            <span>Only One BaseServicePackage Details is Allowed to Add, 
                                So Give Professional Description and Competitive Pricing to ShowCase Customer in their DashBoard.
                            </span>
                        </>
                    )
                    :
                    (
                        <>
                            <button 
                                disabled
                                type="button" 
                                className="btn" 
                                onClick={() => navigate("/vendor/add/packagedetails")}
                            >
                                Add
                            </button>
                            <span>Use Edit if Required Changes. Only One BaseServicePackage Details is Allowed to ShowCase to Customer in DashBoard</span>
                        </>
                    )
                }
            </div>
            <div className="mb-2 text-center fs-4 fw-semibold">Already Exist Package Data</div>
            <table className="table table-success table-striped">
                <thead>
                    <tr>
                        <th>EventServiceName</th>
                        <th>ServiceAmount</th>
                        <th>ServiceDescription</th>
                        <th>ServiceApplicableStates</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vendorPackageList.map((packageData, idx) => {
                            return <ServicePackageCards key={idx} packageData={packageData} idx={idx} />
                        })
                    }
                </tbody>
            </table>
        </>
    )
};


// vendor service package report view creation
function ServicePackageCards({packageData, idx}) {
    const {setEditId, setShow, 
        setEditIdx, setVendorPackageData, setServiceApplyStateIds
    } = useAppContext();
    const navigate = useNavigate();

    // Edit data Populate
    function editdatapopulate(packageData) {
        // console.log("populate", packageData._id)
        setVendorPackageData ({
            eventServiceId: packageData.eventServiceId._id,
            serviceAmount: packageData.serviceAmount,
            serviceDescription: packageData.serviceDescription,
            selectedStateId: packageData.serviceApplyStateIds[0]._id,
        })
        let stateIds = [];
        for(let i=0; i<packageData.serviceApplyStateIds.length; i++) {
            stateIds.push(packageData.serviceApplyStateIds[i]._id)
        };
        setServiceApplyStateIds(stateIds)
    };

    // Edit Package Data
    function editData(e, packageData) {
        // console.log("edit", e, packageData._id, idx)
        e.preventDefault();
        navigate("/vendor/update/packagedetails")
        setShow(false);
        setEditId(packageData._id);
        setEditIdx(idx)
        editdatapopulate(packageData)
    };

    return (
        <tr className="">
            <td className="">{packageData.eventServiceId.eventServiceName}</td>
            <td className="">{packageData.serviceAmount}</td>
            <td className="">{packageData.serviceDescription}</td>
            <td className="">
                {
                    packageData.serviceApplyStateIds.map((data, idx) => {
                        return `"${data.stateName}"`
                    })
                }
            </td>
            <td>
                <button type="button" className="btn btn-edit" onClick={(e) => editData(e, packageData)}>Edit</button>
            </td>
        </tr>
    )
};
