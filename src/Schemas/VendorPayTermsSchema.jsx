import * as yup from "yup";

export const vendorPayTermsSchema = yup.object({
    advBookingPayPercent:  yup.number().required("AdvanceBooking% Required"),
    onEventDatePayPercent: yup.number(),
    postEventPayPercent:  yup.number().required("PostEvent% Required"),
    payTermsDescription: yup.string().required("PayTerms&Contions Required"),
    cancelPolicyDescription: yup.string().required("CancelTerms Required"),
});