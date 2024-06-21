import * as yup from "yup";

export const eventCategorySchema = yup.object({
    categoryName: yup.string().required("CategoryName is Required").min(5, "Min 5 Characters Required")
});