import { Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { MdEmail } from "react-icons/md";
import {
  useChangeEmailMutation,
  useMeEmailQuery,
} from "../../generated/graphql";
import {
  CHANGE_EMAIL_SUCCESS,
  NEW_EMAIL_LABEL,
  CONFIRM_CHANGE_LABEL,
  CURRENT_EMAIL_LABEL,
} from "../../utils/strings";
import { toErrorMap } from "../../utils/toErrorMap";
import { useBetterToast } from "../../utils/useBetterToast";
import { ChangeEmailValidator } from "../../utils/validators";
import { InputField } from "../InputField";
import { RegularButton } from "../RegularButton";

interface ChangeEmailFormProps {}

export const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({}) => {
  const [, changeEmail] = useChangeEmailMutation();
  const [{ data }, meEmail] = useMeEmailQuery();
  const toast = useBetterToast();

  return (
    <Formik
      initialValues={{
        newEmail: "",
      }}
      validationSchema={ChangeEmailValidator}
      onSubmit={async ({ newEmail }, { setErrors }) => {
        const errors = (await changeEmail({ newEmail })).data.changeEmail
          .errors;
        if (errors) {
          setErrors(toErrorMap(errors));
          return;
        }
        meEmail();
        toast("success", CHANGE_EMAIL_SUCCESS);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name="newEmail" label={NEW_EMAIL_LABEL} icon={MdEmail} />
          {data ? (
            <Text my={3}>{CURRENT_EMAIL_LABEL + data.me.email}</Text>
          ) : null}
          <RegularButton spinner={isSubmitting}>
            {CONFIRM_CHANGE_LABEL}
          </RegularButton>
        </Form>
      )}
    </Formik>
  );
};
