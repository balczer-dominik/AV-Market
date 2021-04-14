import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { RegularButton } from "@components/RegularButton";
import { useSendMessageMutation } from "@generated/graphql";
import { CHAT_PLACEHOLDER, SUBMIT_BUTTON } from "@resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { Form, Formik } from "formik";
import React, { useContext, useEffect, useRef } from "react";
import { MdChatBubble } from "react-icons/md";
import { MessagesContext } from "./MessagesProvider";

export const ConversationControls: React.FC<{}> = ({}) => {
  //Color context
  const {
    theme: {
      BACK_COLOR_LIGHTEST,
      BG_COLOR,
      FRONT_COLOR_LIGHTER,
      FRONT_COLOR_LIGHTEST,
    },
  } = useContext(ThemeContext);

  //Messages context
  const {
    state: { conversationId },
    dispatch,
  } = useContext(MessagesContext);

  const [, sendMessage] = useSendMessageMutation();

  const inputRef: React.LegacyRef<HTMLInputElement> = useRef();

  useEffect(() => {
    if (!conversationId) {
      return;
    }
    inputRef.current.focus();
  }, [conversationId]);

  return (
    <Box p={2} bgColor={BACK_COLOR_LIGHTEST} mb={{ base: -2, md: 0 }}>
      <Formik
        initialValues={{ content: "" }}
        onSubmit={async ({ content }, { setValues }) => {
          if (content === "") {
            return;
          }

          const { data, error } = await sendMessage({
            content,
            conversationId,
          });

          if (error) {
            return;
          }

          if (data.sendMessage.message) {
            setValues({ content: "" });
            dispatch({
              type: "newMessage",
              payload: {
                message: data.sendMessage.message,
                conversationId,
              },
            });
          }
        }}
      >
        {({ isSubmitting, values, setValues }) => (
          <Form>
            <HStack align="center">
              <InputGroup>
                <InputLeftElement>
                  <MdChatBubble />
                </InputLeftElement>
                <Input
                  ref={inputRef}
                  value={values.content}
                  onChange={(event) => {
                    setValues({ content: event.target.value });
                  }}
                  bgColor={BG_COLOR}
                  borderColor={FRONT_COLOR_LIGHTER}
                  borderWidth={"0.15rem"}
                  _hover={{ borderColor: FRONT_COLOR_LIGHTEST }}
                  placeholder={CHAT_PLACEHOLDER}
                />
              </InputGroup>
              <RegularButton
                disabled={values.content === ""}
                spinner={isSubmitting}
              >
                {SUBMIT_BUTTON}
              </RegularButton>
            </HStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
