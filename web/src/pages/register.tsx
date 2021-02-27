import { Heading, Stack, Text, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { RegularButton } from "../components/RegularButton";
import { useRegisterMutation } from "../generated/graphql";
import { LIGHTER_REGULAR_BROWN } from "../utils/colors";
import { createUrqlClient } from "../utils/createUrqlClient";
import {
  CONFIRM_PASSWORD_LABEL,
  EMAIL_LABEL_REQUIRED,
  PASSWORD_HINT,
  PASSWORD_LABEL_REQUIRED,
  REDIRECT_MESSAGE,
  REGISTER_BUTTON_LABEL,
  REGISTER_SUCCESS_LABEL,
  REQUIRED_FIELDS_HINT,
  USERNAME_LABEL_REQUIRED,
} from "../utils/strings";
import { toErrorMap } from "../utils/toErrorMap";
import { RegisterValidator } from "../utils/validators";

interface registerProps {}

export const register: React.FC<registerProps> = ({}) => {
  const successToast = useToast();
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Layout variant="small">
      <Stack spacing={4} px={2}>
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
              successToast({
                title: REGISTER_SUCCESS_LABEL,
                description: REDIRECT_MESSAGE,
                status: "success",
                duration: 5000,
                position: "bottom-left",
              });
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Text color={LIGHTER_REGULAR_BROWN}>{REQUIRED_FIELDS_HINT}</Text>

              <InputField
                name="username"
                placeholder="felhasznalonev123"
                label={USERNAME_LABEL_REQUIRED}
                icon={FaUser}
                hint=""
              />

              <InputField
                name="email"
                placeholder="pelda@gmail.com"
                label={EMAIL_LABEL_REQUIRED}
                icon={MdEmail}
              />

              <InputField
                name="password"
                placeholder="**********"
                label={PASSWORD_LABEL_REQUIRED}
                password
                icon={RiLockPasswordFill}
                hint={PASSWORD_HINT}
              />
              <InputField
                name="passwordConfirm"
                placeholder="**********"
                label={CONFIRM_PASSWORD_LABEL}
                password
                icon={RiLockPasswordFill}
              />

              <RegularButton mt={4} spinner={isSubmitting}>
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
