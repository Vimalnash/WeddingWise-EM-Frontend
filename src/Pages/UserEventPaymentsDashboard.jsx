
import { useNavigate } from "react-router-dom";
import { NavBar } from "../Components/NavBar";
import { PageHeader } from "../Components/PageHeader";
import { useAppContext } from "../Context/AppContext";
import { baseurl, userurl } from "../Handlers/BackendUrls";
import { getToken } from "../Authentication/auth";

// Shows Only From Eventplan dashboard detailed
export function UserEventPaymentDashboard() {
    const {userEventPaymentList, paymentsFilter} = useAppContext();

    // Payment paid to particular vendor
    const paidTotalAmount = userEventPaymentList
        .filter((data) => (
            (data.eventPlanMainId._id == paymentsFilter.eventPlanMainId._id) &&
            (data.eventPlanVendorRegId._id == paymentsFilter._id)
        ))
        .map((data, idx) => {
            return data
        })
        .reduce((acc, data, index) => {
            acc.totalAmountPaid = acc.totalAmountPaid + data.amount
            acc.vendorName = data.vendorId.vendorName
            return acc;
        },
        {totalAmountPaid: 0, vendorName: "null"}
    )
    return (
        <>
            <NavBar />
            <PageHeader>
                <h2>Dashboard - Event Payments</h2>
            </PageHeader>
            <div className="cardcustom">
                <div className="card-body">
                    <h3 
                        className="text-center fw-semibold border-bottom border-success"
                    >
                        TotalPaid to 
                        {paidTotalAmount.vendorName} - {paidTotalAmount.totalAmountPaid}
                    </h3>
                </div>
            </div>
            <div className="containercustom">
                {   
                    userEventPaymentList
                    .filter((data) => (
                        (data.eventPlanMainId._id == paymentsFilter.eventPlanMainId._id) &&
                        (data.eventPlanVendorRegId._id == paymentsFilter._id)
                    ))
                    .map((val, idx) => {
                        return <EventsPaymentCards key={idx} val={val} idx={idx} />
                    })
                }
            </div>
        </>
    )
}

// UserEvent Payment Cards Creation with Edit and Delete Functionality
function EventsPaymentCards({val, idx}) {
    const navigate = useNavigate();
    const {setShow, setEditId, setEditIdx, 
        setUserPaymentData, userEventPaymentList, setUserEventPaymentList
    } = useAppContext();

    // Populate the payment data to the editing form
    function editdatapopulate(val) {
        setUserPaymentData({
            eventPlanMainId: val.eventPlanMainId._id,
            eventPlanVendorRegId: val.eventPlanVendorRegId._id,
            vendorId: val.vendorId._id,
            payType: val.payType,
            paidDate: val.paidDate,
            amount: val.amount,
            remarks: val.remarks
        })
    }

    // Edit Payment Button functionality
    function editPayment(e, val, _id, idx) {
        e.preventDefault();
        // console.log("edit", _id, idx)
        navigate("/user/update/vendorpayment")
        setShow(false);
        setEditId(_id);
        setEditIdx(idx);
        editdatapopulate(val);
    }

    // Delete a PaymentData button functionality
    function deletePayment(e, id) {
        e.preventDefault();
        const parent = e.target.parentNode.parentNode;
        // console.log("delete", id, parent);

        const confirmDelete = confirm("Confirm Delete?")
        confirmDelete ?
        (
        fetch(`${baseurl}/${userurl}/delete/vendorpayment/${id}`, {
            method:"DELETE",
            headers: {
                "Content-Type":"application/json",
                "x-auth-token": getToken()
            }
        })
        .then((res) => res.json())
        .then((deletedData) => {
            // console.log(deletedData);
            if(deletedData) {
                const newList = userEventPaymentList.filter((data) => data._id != id)
                setUserEventPaymentList(newList);
            }
        })
        )
        :
        (alert("Not deleted"))
    }

    return (
        <>
        <div className="cardcustom">
            <div className="card-top">
                <div><span className="cardcaption">EventService : </span> <span className="cardvalue">{val.vendorId.eventServiceId.eventServiceName}</span></div>
                <div><span className="cardcaption">Vendor : </span> <span className="cardvalue">{val.vendorId.vendorName}</span></div>
                <div><span className="cardcaption">PaidDate : </span> <span className="cardvalue">{val.paidDate}</span></div>
                <div><span className="cardcaption">PaidAmount : </span> <span className="cardvalue">{val.amount}</span></div>
                <div><span className="cardcaption">Remarks : </span> <span className="cardvalue">{val.remarks}</span></div>

            </div>
            <div className="card-bottom">
                <button onClick={(e) => editPayment(e, val, val._id, idx)} className="btn btn-edit">Edit</button>
                <button onClick={(e) => deletePayment(e, val._id)} className="btn btn-del">Delete</button>
            </div>
        </div>
        </>
    )
};