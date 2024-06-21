import * as yup from "yup";

export const vendorPackageSchema = yup.object({
    eventServiceId:  yup.string().required("EventService Required"),
    serviceAmount: yup.number().required("ServiceAmount Required"),
    serviceDescription:  yup.string().required("ServiceDescription Required"),
    selectedStateId: yup.string().required(),
});

    // serviceApplyStateIds: yup.array().of(yup.string().required("State is Required")).required("Select States")
