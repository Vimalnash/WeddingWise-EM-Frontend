import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup.string().required().min(5, "Type Proper Email address name@gmail.com"),
    password: yup.string().required().min(3, "Use Min 3 Charcters")
});