import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useLoginMutation } from "../generated/graphql";
import { REGULAR_DARK_BROWN, REGULAR_LIGHT_BROWN } from "../utils/colors";
import {
  FORGOTTEN_PASSWORD_LABEL,
  LOGIN_LABEL,
  LOGIN_SUCCESS_LABEL,
  PASSWORD_LABEL,
  USERNAME_OR_EMAIL_LABEL,
  WELCOME_USER,
} from "../utils/strings";
import { toErrorMap } from "../utils/toErrorMap";
import { InputField } from "./InputField";
import { RegularButton } from "./RegularButton";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const [, login] = useLoginMutation();
  const successToast = useToast();
  const router = useRouter();
  const initialRef = useRef();

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent bgColor={"white"} mx={5}>
        <ModalHeader
          bgColor={REGULAR_LIGHT_BROWN}
          color={REGULAR_DARK_BROWN}
          borderTopRadius="md"
        >
          {LOGIN_LABEL}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={{
              usernameOrEmail: "",
              password: "",
            }}
            onSubmit={async ({ usernameOrEmail, password }, { setErrors }) => {
              const response = await login({
                usernameOrEmail,
                password,
              });

              if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors));
                return;
              }

              if (response.data?.login.user) {
                successToast({
                  title: LOGIN_SUCCESS_LABEL,
                  description: WELCOME_USER + response.data.login.user.username,
                  status: "success",
                  duration: 5000,
                  position: "bottom-left",
                });

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
                  ref={initialRef}
                />
                <InputField
                  name="password"
                  label={PASSWORD_LABEL}
                  icon={RiLockPasswordFill}
                  password
                />

                <Flex mt={6} justify="space-between">
                  <RegularButton spinner={isSubmitting}>
                    {LOGIN_LABEL}
                  </RegularButton>
                  <RegularButton variant="outline">
                    {FORGOTTEN_PASSWORD_LABEL}
                  </RegularButton>
                </Flex>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
