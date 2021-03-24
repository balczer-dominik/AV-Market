import { Heading, Stack } from "@chakra-ui/react";
import { InputField } from "@components/InputField";
import { Layout } from "@components/Layout";
import { RegularButton } from "@components/RegularButton";
import { useResetPasswordMutation } from "@generated/graphql";
import { createUrqlClient } from "@utils/createUrqlClient";
import {
  CHANGE_PASSWORD_LABEL,
  CHANGE_PASSWORD_SUCCESS,
  CONFIRM_PASSWORD_LABEL,
  PASSWORD_HINT,
  PASSWORD_LABEL_REQUIRED,
  PASSWORD_PLACEHOLDER,
  REGISTER_PASSWORD_HINT,
  SEND_LABEL,
} from "@utils/strings";
import { ThemeContext } from "@utils/ThemeProvider";
import { toErrorMap } from "@utils/toErrorMap";
import { useBetterToast } from "@utils/useBetterToast";
import { ChangePasswordValidator } from "@utils/validators";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { RiLockPasswordFill } from "react-icons/ri";

const ChangePassword: React.FC = () => {
  const {
    theme: { BACK_COLOR_LIGHTER },
  } = useContext(ThemeContext);
  const [, resetPassword] = useResetPasswordMutation();
  const router = useRouter();
  const toast = useBetterToast();
  return (
    <Layout title={CHANGE_PASSWORD_LABEL} variant="small">
      <Stack spacing={4} p={4} borderRadius="10px" bgColor={BACK_COLOR_LIGHTER}>
        <Heading
          fontSize={"3xl"}
          textAlign="center"
          verticalAlign="center"
          mb={2}
        >
          {CHANGE_PASSWORD_LABEL}
        </Heading>
        <Formik
          initialValues={{
            newPassword: "",
            newPasswordConfirm: "",
          }}
          validationSchema={ChangePasswordValidator}
          onSubmit={async ({ newPassword }, { setErrors }) => {
            const rawToken = router.query.token;
            const token = typeof rawToken === "string" ? rawToken : "";

            const errors = toErrorMap(
              (
                await resetPassword({
                  newPassword,
                  token,
                })
              ).data.resetPassword.errors
            );

            if ("username" in errors) {
              toast("error", errors["username"]);
              router.push("/");
              return;
            }

            if (errors) {
              setErrors(errors);
              return;
            }

            toast("success", CHANGE_PASSWORD_SUCCESS);
            router.push("/");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="newPassword"
                placeholder={PASSWORD_PLACEHOLDER}
                label={PASSWORD_LABEL_REQUIRED}
                type="password"
                icon={RiLockPasswordFill}
                hint={[REGISTER_PASSWORD_HINT, PASSWORD_HINT]}
              />
              <InputField
                name="newPasswordConfirm"
                placeholder={PASSWORD_PLACEHOLDER}
                label={CONFIRM_PASSWORD_LABEL}
                type="password"
                icon={RiLockPasswordFill}
              />

              <RegularButton
                mt={4}
                spinner={isSubmitting}
                disabled={isSubmitting}
              >
                {SEND_LABEL}
              </RegularButton>
            </Form>
          )}
        </Formik>
      </Stack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
