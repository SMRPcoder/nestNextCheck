import * as yup from "yup";

export const AddTodoSchema=yup.object().shape({
    task:yup.string().required("This field is Required")
});

export type AddTodoSchemaType=yup.InferType<typeof AddTodoSchema>;
