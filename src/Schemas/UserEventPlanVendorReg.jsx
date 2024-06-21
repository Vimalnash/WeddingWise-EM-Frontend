import * as yup from "yup";

export const userPlanVendorRegSchema = yup.object({
    eventPlanMainId: yup.string().required(),
    eventServiceId: yup.string().required("EventService is Required"),
    startTime: yup.string().required("StartTime is Required"),
    endTime: yup.string().required("EndTime is Required"),
    vendorId: yup.string().required("Vendor is Required"),
    amount: yup.number().required("Amount is Required"),
    description:  yup.string().required("Description is Required"),
    registered: yup.boolean(),
});