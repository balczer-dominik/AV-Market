import { Flex } from "@chakra-ui/react";
import { InputField } from "@components/InputField";
import { RegularButton } from "@components/RegularButton";
import { useSendMessageMutation } from "@generated/graphql";
import {
  BACK_BUTTON,
  MESSAGE_LABEL,
  SUBMIT_BUTTON,
  TO_LABEL,
} from "@resources/strings";
import { toErrorMap } from "@utils/toErrorMap";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { MessagesContext } from "./MessagesProvider";

interface NewConversationFormProps {
  onClose: () => void;
}

export const NewConversationForm: React.FC<NewConversationFormProps> = ({
  onClose,
}) => {
  const [, sendMessage] = useSendMessageMutation();

  const { dispatch } = useContext(MessagesContext);

  return (
    <Formik
      initialValues={{
        partnerUsername: "",
        content: "",
      }}
      onSubmit={async ({ partnerUsername, content }, { setErrors }) => {
        const { message, errors } = (
          await sendMessage({ partnerUsername, content })
        ).data.sendMessage;

        if (errors) {
          setErrors(toErrorMap(errors));
          return;
        }

        if (message) {
          dispatch({ type: "startNewConversation" });
          onClose();
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name="partnerUsername" label={TO_LABEL} icon={FaUser} />
          <InputField name="content" label={MESSAGE_LABEL} type="textarea" />

          <Flex mt={6} justify="space-between">
            <RegularButton spinner={isSubmitting}>
              {SUBMIT_BUTTON}
            </RegularButton>
            <RegularButton variant="outline" onClick={onClose}>
              {BACK_BUTTON}
            </RegularButton>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
