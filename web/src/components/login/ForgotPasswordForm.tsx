import { Flex } from "@chakra-ui/react";
import { InputField } from "@components/InputField";
import { RegularButton } from "@components/RegularButton";
import { useForgotPasswordMutation } from "@generated/graphql";
import {
  BACK_BUTTON,
  FORGOT_PASSWORD_EMAIL_SENT,
  SEND_LABEL,
  USERNAME_LABEL,
} from "@utils/strings";
import { toErrorMap } from "@utils/toErrorMap";
import { useBetterToast } from "@utils/useBetterToast";
import { Form, Formik } from "formik";
import React from "react";
import { FaUser } from "react-icons/fa";

interface ForgotPasswordFormProps {
  onClose: () => void;
  setForgotPassword: (value: React.SetStateAction<boolean>) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onClose,
  setForgotPassword,
}) => {
  const toast = useBetterToast();
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Formik
      initialValues={{
        username: "",
      }}
      onSubmit={async ({ username }, { setErrors }) => {
        const {
          data: { forgotPassword: error },
        } = await forgotPassword({ username });

        if (error) {
          setErrors(toErrorMap([error]));
          return;
        }

        toast("success", FORGOT_PASSWORD_EMAIL_SENT);
        onClose();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name="username" label={USERNAME_LABEL} icon={FaUser} />
          <Flex mt={6} justify="space-between">
            <RegularButton spinner={isSubmitting}>{SEND_LABEL}</RegularButton>
            <RegularButton
              variant="outline"
              onClick={() => setForgotPassword(false)}
            >
              {BACK_BUTTON}
            </RegularButton>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
