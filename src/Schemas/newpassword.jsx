import * as yup from "yup";

export const newPasswordSchema = yup.object({
    password: yup.string().min(8, 'Password should be of minimum 8 characters length').required("Password is Required"),
    confirmPassword: yup.string().min(8, 'ConfirmPassword should match the Password').required("ConfirmPassword is Required")
});