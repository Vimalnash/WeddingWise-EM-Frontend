
import { useNavigate } from "react-router-dom";
import { NavBar } from "../Components/NavBar";
import { PageHeader } from "../Components/PageHeader";
import { useAppContext } from "../Context/AppContext";

export function UserEventPlanDashboard() {
    const {userEventPlanMainList} = useAppContext();
    const navigate = useNavigate();

    return (
        <>
            <NavBar />
            <PageHeader>
                <h2>Dashboard - Main Event Planning</h2>
            </PageHeader>
            <div className="card-bottom mt-3">
                 <button onClick={()=>navigate("/user/eventplandashboarddetailed")} className="btn btn-edit">GoToDetailDashBoard</button>
            </div>
            <div className="containercustom">
                {   
                    userEventPlanMainList.map((val, idx) => {
                        return <EventsCard key={idx} val={val} idx={idx} />
                    })
                }
            </div>
            <div className="card-bottom mt-3">
                 <button onClick={()=>navigate("/user/eventplandashboarddetailed")} className="btn btn-edit">GoToDetailDashBoard</button>
            </div>
        </>
    )
}

// UserEventPlan Card Structure
function EventsCard({val}) {

    return (
        <div className="cardcustom">
                <h3 className="text-center fw-semibold border-bottom border-success">{val.eventCategoryId.categoryName}</h3>
            <div className="card-top">
                <div><span className="cardcaption">Date : </span> <span className="cardvalue">{val.date}</span></div>
                <div><span className="cardcaption">State : </span> <span className="cardvalue">{val.stateId.stateName}</span></div>
                <div><span className="cardcaption">City : </span> <span className="cardvalue">{val.cityId.cityName}</span></div>
                <div><span className="cardcaption">StartTime : </span> <span className="cardvalue">{val.startTime}</span></div>
                <div><span className="cardcaption">EndTime : </span> <span className="cardvalue">{val.endTime}</span></div>
                <div><span className="cardcaption">Exp.MemberCount : </span> <span className="cardvalue">{val.expectedMemberCount}</span></div>
                <div><span className="cardcaption">BudgetAmount : </span> <span className="cardvalue">{val.budgetAmount}</span></div>
            </div>
        </div>
    )
};