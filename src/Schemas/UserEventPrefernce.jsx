import * as yup from "yup";

export const userEventPreferenceSchema = yup.object({
    eventPlanMainId: yup.string().required(),
    preferenceDesc: yup.string().required(),
});