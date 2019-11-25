import { FormikErrors } from "formik";
import { UserFormValues } from "../../interfaces/user-form.interface";

const validate = (values: UserFormValues) => {
  const errors: FormikErrors<UserFormValues> = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  };

  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  return errors;
};

export default validate;
