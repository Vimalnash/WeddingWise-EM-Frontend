
import { useNavigate } from "react-router-dom";
import { NavBar } from "../Components/NavBar";
import { PageHeader } from "../Components/PageHeader";
import { useAppContext } from "../Context/AppContext";
import { useEffect, useState } from "react";
import { getToken } from "../Authentication/auth";
import { baseurl, userurl } from "../Handlers/BackendUrls";

export function UserEventPlanDashboardDetailed() {
    const {userEventPlanMainList} = useAppContext();
    return (
        <>
            <NavBar />
            <PageHeader>
                <h2>Dashboard - Event Planning - Detailed View</h2>
            </PageHeader>
            <div className="containercustom m-3">
                {   
                    userEventPlanMainList.map((val, idx) => {
                        return <MainEventsCard key={idx} val={val} idx={idx} />
                    })
                }
            </div>
        </>
    )
}




// MainEventPlan Cards Creation with Edit and Plan EventServices(Catering,Travel)
// Delete Enable only when not raise Plan vendor
function MainEventsCard({val, idx}) {
    const navigate = useNavigate();
    const {setShow, setEditId, setEditIdx,
         setUserEventPlanMainData, setMainEventId, setUserEventPreferenceData,
         userEventPlanRegList, setUserEventPlanVendorRegData,
         userPreferenceList, userEventPlanMainList, setUserEventPlanMainList,
         userEventPaymentList
    } = useAppContext();
    
    const [vendorRegAmt, setVendorRegAmt] = useState();
    const [vendorAllotedAmt, setVendorAllotedAmt] = useState();
    const [totalPaidAmt, setTotalPaidAmt] = useState();
    const [planRegCount, setPlanRegCount] = useState();
    const [planRefereceCount, setplanRefereceCount] = useState();

    // Event Summary Regarding Calculation Loop
    const array = userEventPlanRegList
        .filter((data) => data.eventPlanMainId._id == val._id)
        .map((val, idx) => {
            return val
        })
        .reduce(
            (acc, val, index) => {
                acc.totalVendorAllotedAmount = acc.totalVendorAllotedAmount + val.amount;
                acc.eventPlanRegCount = acc.eventPlanRegCount + 1
                if(val.registered) {
                    acc.totalRegisteredAmount = acc.totalRegisteredAmount + val.amount
                }
                return acc;
            },
            { totalVendorAllotedAmount: 0,  totalRegisteredAmount: 0, eventPlanRegCount: 0}
        )

    // Event UserReference Regarding Calculation Loop
    const ReferenceCount = userPreferenceList
        .filter((data) => data.eventPlanMainId._id == val._id)
        .map((val, idx) => {
            return val
        })
        .reduce(
            (acc, val, index) => {
                acc.eventPlanReferenceCount = acc.eventPlanReferenceCount + 1
                return acc;
            },
            { eventPlanReferenceCount: 0}
        )
    
        
    // Event Payment Paid regarding calculation loop
    const paidTotalAmount = userEventPaymentList
            .filter((data) => data.eventPlanMainId._id == val._id)
            .map((val, idx) => {
                return val
            })
            .reduce((acc, val, index) => {
                acc.totalAmountPaid = acc.totalAmountPaid + val.amount
                return acc;
            },
            {totalAmountPaid: 0}
        )

            
    // Setting Total values to state variables
    useEffect(() => {
        setPlanRegCount(array.eventPlanRegCount);
        setVendorAllotedAmt(array.totalVendorAllotedAmount);
        setVendorRegAmt(array.totalRegisteredAmount);
        setTotalPaidAmt(paidTotalAmount.totalAmountPaid);
        setplanRefereceCount(ReferenceCount.eventPlanReferenceCount);
    }, []);

    // Populate the Main Event Plan Data to the editing form(UserEventPlanMain)
    function editdatapopulate(val) {
        setUserEventPlanMainData({
            eventCategoryId: val.eventCategoryId._id,
            stateId: val.stateId._id,
            cityId: val.cityId._id,
            date: val.date,
            startTime:val.startTime,
            endTime: val.endTime,
            expectedMemberCount: val.expectedMemberCount,
            budgetAmount: val.budgetAmount
        })
    };

    // Edit Button functionality for Main Event
    function editMainPlan(e, val, _id, idx) {
        e.preventDefault();
        // console.log("edit", _id, idx)
        navigate("/user/update/eventplanning")
        setShow(false);
        setEditId(_id);
        setEditIdx(idx);
        editdatapopulate(val);
    };

    // Delete button enabled Only When No vendor Planned
    // Main Event Delete Handle
    function deleteMainPlan(e, id) {
        e.preventDefault();
        const parent = e.target.parentNode.parentNode;
        // console.log("delete", id, parent);

        const confirmDelete = confirm("Confirm Delete?")
        confirmDelete ?
        (
        fetch(`${baseurl}/${userurl}/delete/eventplanning/${id}`, {
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
                const newList = userEventPlanMainList.filter((data) => data._id != id) 
                setUserEventPlanMainList(newList)
            }
        })
        )
        :
        (alert("Not deleted"))
    };

    // PlanVendor Button functionality for New event Service Planning
    // Like Photography, Catering, travels
    function planVendor(e, val, _id, idx) {
        e.preventDefault();
        // console.log("edit", _id, idx)
        setShow(true)
        setUserEventPlanVendorRegData({
            eventServiceId: "",
            startTime: "",
            endTime: "",
            vendorId: "",
            amount: "",
            description: "",
            registered: ""
        })
        navigate("/user/add/usereventplanvendorreg")
        setMainEventId(_id)
    };

    // PlanPreference Button functionality for Event Regarding User Preferences
    // for Photography, Catering, travels
    function planEventPreference(e, val, _id, idx) {
        e.preventDefault();
        console.log("add", _id)
        setShow(true)
        setUserEventPreferenceData({
            eventPlanMainId: "",
            preferenceDesc: ""
        })
        navigate("/user/add/preference")
        setMainEventId(_id)
    };


    return (
        <div className="cardcustom m-3 p-2">
            <h3 className="text-center fw-semibold border-bottom border-success">{val.eventCategoryId.categoryName} - {val.date}</h3>
            <div className="card-top">
                <div><span className="cardcaption">Date : </span> <span className="cardvalue">{val.date}</span></div>
                <div><span className="cardcaption">State : </span> <span className="cardvalue">{val.stateId.stateName}</span></div>
                <div><span className="cardcaption">City : </span> <span className="cardvalue">{val.cityId.cityName}</span></div>
                <div><span className="cardcaption">StartTime : </span> <span className="cardvalue">{val.startTime}</span></div>
                <div><span className="cardcaption">EndTime : </span> <span className="cardvalue">{val.endTime}</span></div>
                <div><span className="cardcaption">Exp.MemberCount : </span> <span className="cardvalue">{val.expectedMemberCount}</span></div>
                <div><span className="cardcaption">BudgetAmount : </span> <span className="cardvalue">{val.budgetAmount}</span></div>
            </div>
            <div className="card-bottom">
                <button onClick={(e) => editMainPlan(e, val, val._id, idx)} className="btn btn-edit">Edit</button>
                {
                    (planRegCount>0) || (planRefereceCount > 0) ?
                    (
                        <button disabled onClick={(e) => deleteMainPlan(e, val._id)} className="btn btn-del">Delete</button>
                    )
                    :
                    (
                        <button onClick={(e) => deleteMainPlan(e, val._id)} className="btn btn-del">Delete</button>
                    )
                }
                <div className="card-bottom">
                    <button onClick={(e) => planVendor(e, val, val._id, idx)} className="btn">PlanVendor</button>
                    <button onClick={(e) => planEventPreference(e, val, val._id, idx)} className="btn">PlanEventPreference</button>
                </div>
            </div>
            <hr />
            <h4 className="text-center fw-semibold border-bottom-subtle border-success">Your Event Preferences</h4>
                {
                    userPreferenceList
                    .filter((data) => data.eventPlanMainId._id == val._id)
                    .map((val, idx) => {
                        return <EventPreferenceCard key={idx} preferenceVal={val} idx={idx} />
                    })
                }
            <hr/>
            <h4 className="text-center fw-semibold border-bottom-subtle border-success">Your Event Vendors Planned & Registerd</h4>
            <div className="containercustom m-3">
                {   
                    userEventPlanRegList
                    .filter((data) => data.eventPlanMainId._id == val._id)
                    .map((val, idx) => {
                        return <EventsVendorCard key={idx} val={val} idx={idx} />
                    })
                }
            </div>
            <hr />
            <h2 className="text-center fw-semibold border-bottom border-success">Event Summary - BudgetPlanned - {val.budgetAmount}</h2>
            <div className="d-flex flex-row flex-warp justify-content-center gap-2">
                <div className="cardcustom col-md-6 p-2" >
                    <h3 className="text-center fw-semibold border-bottom border-success">Planned Basis</h3>
                    {/* <div><span className="cardcaption">Budget Planned: </span> <span className="cardvalue">{val.budgetAmount} </span></div> */}
                    <div><span className="cardcaption"> VendorWise Planned: </span> <span className="cardvalue"> {vendorAllotedAmt} </span></div>
                    <div><span className="cardcaption"> Balance: </span> <span className="cardvalue"> {val.budgetAmount-vendorAllotedAmt} </span></div>
                </div>
                <div className="cardcustom col-md-6 p-2" >                    
                    <h3 className="text-center fw-semibold border-bottom border-success">Confirmed Basis</h3>
                    <div><span className="cardcaption"> Confirmed/Reg:</span> <span className="cardvalue"> {vendorRegAmt} </span></div>
                    <div><span className="cardcaption"> Balance : </span> <span className="cardvalue"> {val.budgetAmount-vendorRegAmt} </span></div>
                    <div><span className="cardcaption"> TotalPaymentMade : </span> <span className="cardvalue"> {totalPaidAmt} </span></div>
                    <div><span className="cardcaption"> ToPay : </span> <span className="cardvalue"> {vendorRegAmt-totalPaidAmt} </span></div>
                </div>

            </div>
        </div>
    )
};




// Event Preference Card View
function EventPreferenceCard({preferenceVal, idx}) {

    const navigate = useNavigate();
    const {setShow, setEditId, setEditIdx,
        setUserEventPreferenceData, setMainEventId, 
        userPreferenceList, setUserPreferenceList
    } = useAppContext();

    // Populate the Event Service Vendor Plan Data to the editing form(UserEventPlanVendorReg)
    function editdatapopulate(preferenceVal) {
        setMainEventId(preferenceVal.eventPlanMainId._id)
        setUserEventPreferenceData({
            preferenceDesc: preferenceVal.preferenceDesc,
        })
    };

    // Edit and Delete Button

    // Edit Button functionality
    function editData(e, preferenceVal, _id, idx) {
        e.preventDefault();
        // console.log("edit",preferenceVal, _id, idx)
        navigate("/user/update/preference")
        setShow(false);
        setEditId(_id);
        setEditIdx(idx);
        editdatapopulate(preferenceVal);
    };

    // Delete button functionality
    function deleteData(e, id, idx) {
        e.preventDefault();
        const parent = e.target.parentNode.parentNode;
        // console.log("delete", id, parent);

        const confirmDelete = confirm("Confirm Delete?")
        confirmDelete ?
        (
        fetch(`${baseurl}/${userurl}/delete/preference/${id}`, {
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
                const newList = userPreferenceList.filter((data) => data._id != id)
                setUserPreferenceList(newList);
            }
        })
        )
        :
        (alert("Not deleted"))
    };


    return (
        <div className="cardcustom col-md-6">
            <div className="card-top">
                <div><span className="cardcaption">Description : </span> <span className="cardvalue">{preferenceVal.preferenceDesc}</span></div>
            </div>
            <div className="card-bottom">
                <button onClick={(e) => editData(e, preferenceVal, preferenceVal._id, idx)} className="btn btn-edit">Edit</button>
                <button onClick={(e) => deleteData(e, preferenceVal._id, idx)} className="btn btn-del">Delete</button>
            </div>

        </div>
    )
};




// Cards Creation for Event Services Vendor Wise Planned Details
// for Photography, Catering, etc services or as a whole individual
function EventsVendorCard({val, idx}) {
    const navigate = useNavigate();
    const {setShow, setEditId, setEditIdx,
        setUserEventPlanVendorRegData, setMainEventId, 
        setUserPaymentData, setPaymentsFilter,
        userEventPlanRegList, setUserEventPlanRegList
    } = useAppContext();

    // Populate the Event Service Vendor Plan Data to the editing form(UserEventPlanVendorReg)
    function editdatapopulate(val) {
        setMainEventId(val.eventPlanMainId._id)
        setUserEventPlanVendorRegData({
            eventServiceId: val.eventServiceId._id,
            startTime:val.startTime,
            endTime: val.endTime,
            vendorId: val.vendorId._id,
            amount: val.amount,
            description: val.description,
            registered: val.registered
        })
    };

    // Edit and Delete Button Shows Only when Not Registered

    // Edit Button functionality
    function editData(e, val, _id, idx) {
        e.preventDefault();
        // console.log("edit",val, _id, idx)
        navigate("/user/update/usereventplanvendorreg")
        setShow(false);
        setEditId(_id);
        setEditIdx(idx);
        editdatapopulate(val);
    };

    // Delete a Event Service VendorPlan and Reg
    function deleteData(e, id) {
        e.preventDefault();
        const parent = e.target.parentNode.parentNode;
        // console.log("delete", id, parent);
        const confirmDelete = confirm("Confirm Delete?")
        confirmDelete ?
        (
        fetch(`${baseurl}/${userurl}/delete/eventplanningvendor/${id}`, {
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
                const newList = userEventPlanRegList.filter((data) => data._id != id)
                setUserEventPlanRegList(newList);
            }
        })
        )
        :
        (alert("Not deleted"))
    }

    // Raise Payment and ViewPayment Button Shows Only When Registerd

    // Raise Payment Button Only for the Registered Event Services
    function raisePayment(e, val, _id, idx) {
        e.preventDefault();
        // console.log("edit",val, _id, idx)
        setShow(true)
        setUserPaymentData({
            eventPlanMainId: val.eventPlanMainId._id,
            eventPlanVendorRegId: _id,
            vendorId: val.vendorId._id,
            amount: "",
            payType: "",
            remarks: ""
        })
        navigate("/user/add/vendorpayment")
    }

    // View Payments Regarding to that particular event service
    function viewPayments(e, val, _id, idx) {
        setPaymentsFilter(val)
        navigate("/user/dashboard/vendorpayments")
    }

    return (
        <div className="cardcustom col-md-6">
            <div className="card-top">
                <div><span className="cardcaption">Event Service :  </span> <span className="cardvalue">{val.eventServiceId.eventServiceName}</span></div>
                <div><span className="cardcaption">StartTime : </span> <span className="cardvalue">{val.startTime}</span></div>
                <div><span className="cardcaption">EndTime : </span> <span className="cardvalue">{val.endTime}</span></div>
                <div><span className="cardcaption">Vendor : </span> <span className="cardvalue">{val.vendorId.vendorName}</span></div>
                <div><span className="cardcaption">Description : </span> <span className="cardvalue">{val.description}</span></div>
                <div><span className="cardcaption">PayableAmount : </span> <span className="cardvalue">{val.amount}</span></div>
                <div><span className="cardcaption">isRegistered : </span> <span className="cardvalue">
                    {val.registered ? <span className="text-success">"Registered"</span> : <span className="text-danger">"Not-Registered"</span> }</span>
                </div>
            </div>
            <div className="card-bottom">
                {val.registered ? (
                    <>
                        <button disabled onClick={(e) => editData(e, val, val._id, idx)} className="btn btn-edit">Edit</button>
                        <button disabled onClick={(e) => deleteData(e, val._id)} className="btn btn-del">Delete</button>
                        <div className="card-bottom">
                            <button onClick={(e) => raisePayment(e, val, val._id, idx)} className="btn">RaisePayment</button>
                            <button onClick={(e) => viewPayments(e, val, val._id, idx)} className="btn">ViewPayments</button>
                        </div>
                    </>
                )
                : 
                (
                    <>
                        <button onClick={(e) => editData(e, val, val._id, idx)} className="btn btn-edit">Edit</button>
                        <button onClick={(e) => deleteData(e, val._id)} className="btn btn-del">Delete</button>
                        <div className="card-bottom">
                            <button disabled onClick={(e) => raisePayment(e, val, val._id, idx)} className="btn">RaisePayment</button>
                            <button disabled onClick={(e) => viewPayments(e, val, val._id, idx)} className="btn">ViewPayments</button>
                        </div>
                    </>
                )
                }
            </div>

        </div>
    )
};
