import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { LOGIN_LABEL } from "src/resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import React, { useContext, useRef, useState } from "react";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { LoginForm } from "./LoginForm";

interface LoginDialogueProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginDialogue: React.FC<LoginDialogueProps> = ({
  isOpen,
  onClose,
}) => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const {
    theme: { BG_COLOR, ACCENT_COLOR, BACK_COLOR },
  } = useContext(ThemeContext);
  const initialRef = useRef();

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent bgColor={BG_COLOR} mx={5}>
        <ModalHeader
          bgColor={BACK_COLOR}
          color={ACCENT_COLOR}
          borderTopRadius="md"
        >
          {LOGIN_LABEL}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {forgotPassword ? (
            <ForgotPasswordForm
              onClose={onClose}
              setForgotPassword={setForgotPassword}
            />
          ) : (
            <LoginForm
              onClose={onClose}
              setForgotPassword={setForgotPassword}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
