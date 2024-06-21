import * as yup from "yup";

export const userSignupSchema = yup.object({
    userName: yup.string().required("UserName is Required").min(3, "Use Min 3 Charcters"),
    phone: yup.number().required("PhoneNo is Required").min(9, "10 digits required"),
    email: yup.string().required("Email is Required").min(5, "Type Proper Email address name@gmail.com"),
    password: yup.string().required("Password is Required").min(3, "Use Min 3 Charcters")
});