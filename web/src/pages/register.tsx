import { Heading, Stack, Text } from "@chakra-ui/react";
import { InputField } from "@components/InputField";
import { Layout } from "@components/Layout";
import { RegularButton } from "@components/RegularButton";
import { useRegisterMutation } from "@generated/graphql";
import { createUrqlClient } from "@utils/urql/createUrqlClient";
import {
  CONFIRM_PASSWORD_LABEL,
  EMAIL_LABEL_REQUIRED,
  EMAIL_PLACEHOLDER,
  PASSWORD_HINT,
  PASSWORD_LABEL_REQUIRED,
  PASSWORD_PLACEHOLDER,
  REDIRECT_MESSAGE,
  REGISTER_BUTTON_LABEL,
  REGISTER_LABEL,
  REGISTER_PASSWORD_HINT,
  REGISTER_SUCCESS_LABEL,
  REGISTER_USERNAME_HINT,
  REQUIRED_FIELDS_HINT,
  USERNAME_LABEL_REQUIRED,
  USERNAME_PLACEHOLDER,
} from "src/resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { toErrorMap } from "@utils/toErrorMap";
import { useBetterToast } from "@utils/hooks/useBetterToast";
import { RegisterValidator } from "@utils/validators";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

interface registerProps {}

export const register: React.FC<registerProps> = ({}) => {
  const {
    theme: { FRONT_COLOR_LIGHTER, BACK_COLOR_LIGHTER },
  } = useContext(ThemeContext);
  const toast = useBetterToast();
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Layout title={REGISTER_LABEL} variant="small">
      <Stack spacing={4} p={4} borderRadius="10px" bgColor={BACK_COLOR_LIGHTER}>
        <Heading
          fontSize={"5xl"}
          textAlign="center"
          verticalAlign="center"
          mb={5}
        >
          Regisztráció
        </Heading>
        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
            passwordConfirm: "",
          }}
          validationSchema={RegisterValidator}
          onSubmit={async ({ username, email, password }, { setErrors }) => {
            const response = await register({
              options: { username, email, password },
            });
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
              return;
            }

            if (response.data?.register.user) {
              toast("success", REGISTER_SUCCESS_LABEL, REDIRECT_MESSAGE);
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Text color={FRONT_COLOR_LIGHTER}>{REQUIRED_FIELDS_HINT}</Text>

              <InputField
                name="username"
                placeholder={USERNAME_PLACEHOLDER}
                hint={[REGISTER_USERNAME_HINT]}
                label={USERNAME_LABEL_REQUIRED}
                icon={FaUser}
              />

              <InputField
                name="email"
                placeholder={EMAIL_PLACEHOLDER}
                label={EMAIL_LABEL_REQUIRED}
                icon={MdEmail}
              />

              <InputField
                name="password"
                placeholder={PASSWORD_PLACEHOLDER}
                label={PASSWORD_LABEL_REQUIRED}
                type="password"
                icon={RiLockPasswordFill}
                hint={[REGISTER_PASSWORD_HINT, PASSWORD_HINT]}
              />
              <InputField
                name="passwordConfirm"
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
                {REGISTER_BUTTON_LABEL}
              </RegularButton>
            </Form>
          )}
        </Formik>
      </Stack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(register);
