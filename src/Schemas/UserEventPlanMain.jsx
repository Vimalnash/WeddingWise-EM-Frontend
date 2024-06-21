import * as yup from "yup";

export const userEventPlanMainSchema = yup.object({
    eventCategoryId: yup.string().required("EventCategory is Required"),
    stateId: yup.string().required("State is Required"),
    cityId: yup.string().required("City is Required"),
    date: yup.string().required("Date is Required"),
    startTime: yup.string().required("StartTime is Required"),
    endTime: yup.string().required("EndTime is Required"),
    expectedMemberCount: yup.number().required("ExpectedMemberCount is Required"),
    budgetAmount: yup.number().required("BudgetAmount is Required")
});