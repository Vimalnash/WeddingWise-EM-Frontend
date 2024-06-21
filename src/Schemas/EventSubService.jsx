import * as yup from "yup";

export const eventSubServiceSchema = yup.object({
    eventServiceId: yup.string().required("EventService is Required"),
    subServiceName: yup.string().required("SubService is Required"),
    subServiceDescription: yup.string().required("PreDefined Description is Required to display").min(20, "Min 20 Characted Required")
})