import { Box, Text } from "@chakra-ui/react";
import { formatPhone } from "@utils/formatters/formatPhoneNumber";
import { useBetterToast } from "@utils/hooks/useBetterToast";
import { toErrorMap } from "@utils/toErrorMap";
import { ChangeContactsValidator } from "@utils/validators";
import { Form, Formik } from "formik";
import React from "react";
import { FaFacebookMessenger, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  CHANGE_CONTACTS_SUCCESS,
  CHANGE_EMAIL_PLACEHOLDER,
  CHANGE_MESSENGER_PLACEHOLDER,
  CHANGE_PHONE_PLACEHOLDER,
  CONFIRM_CHANGE_LABEL,
  CURRENT_EMAIL_LABEL,
  CURRENT_MESSENGER_LABEL,
  CURRENT_PHONE_LABEL,
  DATA_NOT_SUPPLIED,
  NEW_EMAIL_LABEL,
  NEW_MESSENGER_LABEL,
  NEW_PHONE_LABEL,
} from "src/resources/strings";
import {
  useChangeContactsMutation,
  useMeContactsQuery,
} from "@generated/graphql";
import { InputField } from "@components/InputField";
import { RegularButton } from "@components/RegularButton";

interface ChangeContactsFormProps {}

export const ChangeContactsForm: React.FC<ChangeContactsFormProps> = ({}) => {
  const [, changeContacts] = useChangeContactsMutation();
  const [{ data }, meEmail] = useMeContactsQuery();
  const toast = useBetterToast();

  return (
    <Formik
      initialValues={{
        email: "",
        messenger: "",
        phone: "",
      }}
      validationSchema={ChangeContactsValidator}
      onSubmit={async ({ email, messenger, phone }, { setErrors }) => {
        const errors = (
          await changeContacts({ contacts: { email, messenger, phone } })
        ).data.changeContacts.errors;
        if (errors) {
          setErrors(toErrorMap(errors));
          return;
        }
        meEmail();
        toast("success", CHANGE_CONTACTS_SUCCESS);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField
            name="email"
            label={NEW_EMAIL_LABEL}
            icon={MdEmail}
            placeholder={CHANGE_EMAIL_PLACEHOLDER}
          />
          <InputField
            name="messenger"
            label={NEW_MESSENGER_LABEL}
            icon={FaFacebookMessenger}
            placeholder={CHANGE_MESSENGER_PLACEHOLDER}
          />
          <InputField
            name="phone"
            label={NEW_PHONE_LABEL}
            icon={FaPhone}
            placeholder={CHANGE_PHONE_PLACEHOLDER}
          />
          {data ? (
            <Box my={3}>
              <Text>{CURRENT_EMAIL_LABEL + data.me.email}</Text>
              <Text>
                {CURRENT_MESSENGER_LABEL +
                  (data.me.messenger ?? DATA_NOT_SUPPLIED)}
              </Text>
              <Text>
                {CURRENT_PHONE_LABEL +
                  (formatPhone(data.me.phone) ?? DATA_NOT_SUPPLIED)}
              </Text>
            </Box>
          ) : null}
          <RegularButton spinner={isSubmitting}>
            {CONFIRM_CHANGE_LABEL}
          </RegularButton>
        </Form>
      )}
    </Formik>
  );
};
