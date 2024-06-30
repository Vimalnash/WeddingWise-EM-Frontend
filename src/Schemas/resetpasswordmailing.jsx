import * as yup from "yup";

export const resetPasswordMailingSchema = yup.object({
    email: yup.string().email("Enter a valid email").required("Email is Required"),
});