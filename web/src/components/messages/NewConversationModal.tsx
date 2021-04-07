import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { SEND_MESSAGE_LABEL } from "@resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import React, { useContext } from "react";
import { NewConversationForm } from "./NewConversationForm";

interface NewConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleNewConversation: () => void;
}

export const NewConversationModal: React.FC<NewConversationModalProps> = ({
  isOpen,
  onClose,
  handleNewConversation,
}) => {
  const {
    theme: { BG_COLOR, ACCENT_COLOR, BACK_COLOR },
  } = useContext(ThemeContext);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={BG_COLOR} mx={5}>
        <ModalHeader
          bgColor={BACK_COLOR}
          color={ACCENT_COLOR}
          borderTopRadius="md"
        >
          {SEND_MESSAGE_LABEL}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <NewConversationForm
            onClose={onClose}
            handleNewConversation={handleNewConversation}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
