import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";
import {
  Box,
  Button,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { CheckIcon, PhoneIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { REGULAR_BROWN } from "../utils/colors";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { RegisterValidator } from "../utils/validators";

interface registerProps {}

export const register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Layout variant="small">
      <Stack spacing={4} px={2}>
        <Heading fontSize={"5xl"} textAlign="center" verticalAlign="center">
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
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                placeholder="felhasznalonev123"
                label="Felhasználónév"
                icon={FaUser}
              />

              <InputField
                name="email"
                placeholder="pelda@gmail.com"
                label="E-mail cím"
                icon={MdEmail}
              />

              <InputField
                name="password"
                placeholder="**********"
                label="Jelszó"
                password
                icon={RiLockPasswordFill}
                hint="Olyan jelszavat adjon meg amelyet még nem használ máshol."
              />
              <InputField
                name="passwordConfirm"
                placeholder="**********"
                label="Jelszó ismét"
                type="password"
                icon={RiLockPasswordFill}
              />

              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                background={REGULAR_BROWN}
                colorScheme="green"
                color="white"
              >
                Regisztrálok
              </Button>
            </Form>
          )}
        </Formik>
      </Stack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(register);
