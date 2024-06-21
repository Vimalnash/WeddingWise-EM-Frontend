import * as yup from "yup";

export const eventServiceSchema = yup.object({
    eventServiceName: yup.string().required("ServiceName is Required")
})