import { Flex } from "@chakra-ui/react";
import { useLoginMutation } from "@generated/graphql";
import {
  FORGOTTEN_PASSWORD_LABEL,
  LOGIN_LABEL,
  LOGIN_SUCCESS_LABEL,
  PASSWORD_LABEL,
  PASSWORD_PLACEHOLDER,
  USERNAME_OR_EMAIL_LABEL,
  WELCOME_USER,
} from "@utils/strings";
import { toErrorMap } from "@utils/toErrorMap";
import { useBetterToast } from "@utils/useBetterToast";
import { Form, Formik } from "formik";
import router from "next/router";
import React from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { InputField } from "../InputField";
import { RegularButton } from "../RegularButton";

interface LoginFormProps {
  onClose: () => void;
  setForgotPassword: (value: React.SetStateAction<boolean>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onClose,
  setForgotPassword,
}) => {
  const [, login] = useLoginMutation();
  const toast = useBetterToast();
  return (
    <Formik
      initialValues={{
        usernameOrEmail: "",
        password: "",
      }}
      onSubmit={async ({ usernameOrEmail, password }, { setErrors }) => {
        const { user, errors } = (
          await login({
            usernameOrEmail,
            password,
          })
        ).data.login;

        if (errors) {
          setErrors(toErrorMap(errors));
          return;
        }

        if (user) {
          toast("success", LOGIN_SUCCESS_LABEL, WELCOME_USER + user.username);

          onClose();
          router.reload();
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField
            name="usernameOrEmail"
            label={USERNAME_OR_EMAIL_LABEL}
            icon={FaUser}
            placeholder={USERNAME_OR_EMAIL_LABEL}
          />
          <InputField
            name="password"
            label={PASSWORD_LABEL}
            icon={RiLockPasswordFill}
            placeholder={PASSWORD_PLACEHOLDER}
            type="password"
          />

          <Flex mt={6} justify="space-between">
            <RegularButton spinner={isSubmitting}>{LOGIN_LABEL}</RegularButton>
            <RegularButton
              variant="outline"
              onClick={() => setForgotPassword(true)}
            >
              {FORGOTTEN_PASSWORD_LABEL}
            </RegularButton>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
