import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
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
  PASSWORD_PLACEHOLDER,
  USERNAME_OR_EMAIL_LABEL,
  WELCOME_USER,
} from "../utils/strings";
import { toErrorMap } from "../utils/toErrorMap";
import { useBetterToast } from "../utils/useBetterToast";
import { InputField } from "./InputField";
import { RegularButton } from "./RegularButton";

interface LoginDialogueProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginDialogue: React.FC<LoginDialogueProps> = ({
  isOpen,
  onClose,
}) => {
  const [, login] = useLoginMutation();
  const toast = useBetterToast();
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
                toast(
                  "success",
                  LOGIN_SUCCESS_LABEL,
                  WELCOME_USER + user.username
                );

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
                  placeholder={USERNAME_OR_EMAIL_LABEL}
                />
                <InputField
                  name="password"
                  label={PASSWORD_LABEL}
                  icon={RiLockPasswordFill}
                  placeholder={PASSWORD_PLACEHOLDER}
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
