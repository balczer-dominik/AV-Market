import { Box, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { FaFacebookMessenger, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  useChangeContactsMutation,
  useMeContactsQuery,
} from "../../generated/graphql";
import { formatPhone } from "@utils/formatPhoneNumber";
import {
  CHANGE_CONTACTS_SUCCESS,
  CONFIRM_CHANGE_LABEL,
  CURRENT_EMAIL_LABEL,
  CURRENT_MESSENGER_LABEL,
  CURRENT_PHONE_LABEL,
  DATA_NOT_SUPPLIED,
  NEW_EMAIL_LABEL,
  NEW_MESSENGER_LABEL,
  NEW_PHONE_LABEL,
} from "@utils/strings";
import { toErrorMap } from "@utils/toErrorMap";
import { useBetterToast } from "@utils/useBetterToast";
import { ChangeEmailValidator } from "@utils/validators";
import { InputField } from "../InputField";
import { RegularButton } from "../RegularButton";

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
      validationSchema={ChangeEmailValidator}
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
          <InputField name="email" label={NEW_EMAIL_LABEL} icon={MdEmail} />
          <InputField
            name="messenger"
            label={NEW_MESSENGER_LABEL}
            icon={FaFacebookMessenger}
          />
          <InputField name="phone" label={NEW_PHONE_LABEL} icon={FaPhone} />
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
