import { useNavigate } from "react-router-dom"
import { useAppContext } from "../Context/AppContext";
import { NavBar } from "../Components/NavBar";
import { PageHeader } from "../Components/PageHeader";

export function VendorPayTerms() {
    const navigate = useNavigate();
    const { vendorPayTermsList,
    }= useAppContext();

    return (
        <>
            <NavBar />
            <PageHeader>
                <h4>Vendor PayTerms View</h4>
            </PageHeader>
            <hr />
            <div>
                {
                    vendorPayTermsList.length <= 0 ? 
                    (
                        <button 
                            type="button" 
                            className="btn" 
                            onClick={() => navigate("/vendor/add/paymentterms")}
                        >
                            Add
                        </button>
                    )
                    :
                    (
                    <>
                        <button 
                            disabled
                            type="button" 
                            className="btn" 
                            onClick={() => navigate("/vendor/add/paymentterms")}
                        >
                            Add
                        </button>
                        <span>Only One Payment Term- So Edit If Necessary</span>
                    </>
                    )
                }

            </div>
            <div className="mb-2 text-center fs-4 fw-semibold">Already Exist Payment Terms</div>
            <table className="table table-success table-striped">
                <thead>
                    <tr>
                        <th>AdvBookingPay % </th>
                        <th>OnEventDatePay % </th>
                        <th>PostEventPay % </th>
                        <th>PayTermsDesc</th>
                        <th>CancelTermsDesc</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vendorPayTermsList.map((payTermData, idx) => {
                            return <PaymentTermCards key={idx} payTermData={payTermData} idx={idx} />
                        })
                    }
                </tbody>
            </table>
        </>
    )
};

function PaymentTermCards({payTermData, idx}) {
    const {setEditId, setShow, 
        setEditIdx, setVendorPayTermsData,
    } = useAppContext();
    const navigate = useNavigate();

    function editdatapopulate(payTermData) {
        // console.log("populate", payTermData._id)
        setVendorPayTermsData ({
            advBookingPayPercent: payTermData.advBookingPayPercent,
            onEventDatePayPercent: payTermData.onEventDatePayPercent,
            postEventPayPercent: payTermData.postEventPayPercent,
            payTermsDescription: payTermData.payTermsDescription,
            cancelPolicyDescription: payTermData.cancelPolicyDescription,
        })
    };

    function editData(e, payTermData) {
        // console.log("edit", e, payTermData._id, idx)
        e.preventDefault();
        navigate("/vendor/update/paymentterms")
        setShow(false);
        setEditId(payTermData._id);
        setEditIdx(idx)
        editdatapopulate(payTermData)
    };

    return (
        <tr className="">
            <td className="">{payTermData.advBookingPayPercent}</td>
            <td className="">{payTermData.onEventDatePayPercent}</td>
            <td className="">{payTermData.postEventPayPercent}</td>
            <td className="">{payTermData.payTermsDescription}</td>
            <td className="">{payTermData.cancelPolicyDescription}</td>
            <td>
                <button type="button" className="btn btn-edit" onClick={(e) => editData(e, payTermData)}>Edit</button>
            </td>
        </tr>
    )
};
