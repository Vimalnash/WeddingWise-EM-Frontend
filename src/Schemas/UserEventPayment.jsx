import * as yup from "yup";

export const userEventPaymentSchema = yup.object({
    eventPlanMainId: yup.string().required(),
    eventPlanVendorRegId: yup.string().required(),
    vendorId: yup.string().required(),
    payType: yup.string().required("PayType is Required"),
    paidDate: yup.string().required("PaidDate is Required"),
    amount: yup.number().required("Amount is Required"),
    remarks: yup.string()
});