import { Form, Formik } from "formik";
import React from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { useChangePasswordMutation } from "../../generated/graphql";
import {
  CHANGE_PASSWORD_SUCCESS,
  CONFIRM_CHANGE_LABEL,
  CONFIRM_PASSWORD_LABEL,
  CURRENT_PASSWORD_LABEL,
  NEW_PASSWORD_LABEL,
} from "src/resources/strings";
import { toErrorMap } from "@utils/toErrorMap";
import { useBetterToast } from "@utils/hooks/useBetterToast";
import { ChangePasswordValidator } from "@utils/validators";
import { InputField } from "../InputField";
import { RegularButton } from "../RegularButton";

interface ChangePasswordFormProps {}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({}) => {
  const [, changePassword] = useChangePasswordMutation();
  const toast = useBetterToast();
  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
      }}
      validationSchema={ChangePasswordValidator}
      onSubmit={async ({ oldPassword, newPassword }, { setErrors }) => {
        const errors = (await changePassword({ oldPassword, newPassword })).data
          .changePassword.errors;
        if (errors) {
          setErrors(toErrorMap(errors));
          return;
        }

        toast("success", CHANGE_PASSWORD_SUCCESS);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField
            name="oldPassword"
            label={CURRENT_PASSWORD_LABEL}
            icon={RiLockPasswordFill}
            type="password"
          />
          <InputField
            name="newPassword"
            label={NEW_PASSWORD_LABEL}
            icon={RiLockPasswordFill}
            type="password"
          />
          <InputField
            name="newPasswordConfirm"
            label={CONFIRM_PASSWORD_LABEL}
            icon={RiLockPasswordFill}
            type="password"
          />
          <RegularButton mt={4} spinner={isSubmitting}>
            {CONFIRM_CHANGE_LABEL}
          </RegularButton>
        </Form>
      )}
    </Formik>
  );
};
