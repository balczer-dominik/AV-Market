import { Heading, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { MdEmail } from "react-icons/md";
import { FileUploader } from "../../components/FileUploader";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { RegularButton } from "../../components/RegularButton";
import {
  useChangeEmailMutation,
  useMeFullQuery,
  useUploadAvatarMutation,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  CHANGE_AVATAR_SUCCESS,
  CHANGE_EMAIL_SUCCESS,
  CONFIRM_CHANGE_LABEL,
  CURRENT_EMAIL_LABEL,
  EDIT_PROFILE_LABEL,
  ERROR_GENERIC,
  NEW_EMAIL_LABEL,
} from "../../utils/strings";
import { toErrorMap } from "../../utils/toErrorMap";
import { useIsAuth } from "../../utils/useIsAuth";
import { useBetterToast } from "../../utils/useSuccessToast";
import { ChangeEmailValidator } from "../../utils/validators";

const Edit: React.FC<{}> = ({}) => {
  useIsAuth();
  const [{ data: meData, fetching: meFetching }, me] = useMeFullQuery();
  const [, changeEmail] = useChangeEmailMutation();
  const [, uploadAvatar] = useUploadAvatarMutation();
  const toast = useBetterToast();
  return (
    <Layout variant="small">
      {meFetching || !meData.me ? null : (
        <Stack spacing={4} px={2}>
          <Heading
            fontSize={"4xl"}
            textAlign="center"
            verticalAlign="center"
            mb={5}
          >
            {EDIT_PROFILE_LABEL}
          </Heading>
          <Formik
            initialValues={{
              newEmail: "",
            }}
            validationSchema={ChangeEmailValidator}
            onSubmit={async ({ newEmail }, { setErrors }) => {
              const response = await changeEmail({ newEmail });
              if (response.data.changeEmail.errors) {
                setErrors(toErrorMap(response.data.changeEmail.errors));
                return;
              }
              me();
              toast("success", CHANGE_EMAIL_SUCCESS);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Heading
                  fontSize={"md"}
                  textAlign="left"
                  verticalAlign="center"
                >
                  {CURRENT_EMAIL_LABEL + meData.me.email}
                </Heading>
                <InputField
                  name="newEmail"
                  label={NEW_EMAIL_LABEL}
                  icon={MdEmail}
                />
                <RegularButton mt={4} spinner={isSubmitting}>
                  {CONFIRM_CHANGE_LABEL}
                </RegularButton>
              </Form>
            )}
          </Formik>
          <Formik
            initialValues={{
              newAvatar: null,
            }}
            onSubmit={async ({ newAvatar }, { setErrors }) => {
              const result = await uploadAvatar({ avatar: newAvatar });
              if (result.data.uploadAvatar) {
                toast("success", CHANGE_AVATAR_SUCCESS);
                return;
              }
              toast("error", ERROR_GENERIC);
            }}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <FileUploader setter={setFieldValue} fieldName={"newAvatar"} />
                <RegularButton mt={4} spinner={isSubmitting}>
                  {CONFIRM_CHANGE_LABEL}
                </RegularButton>
              </Form>
            )}
          </Formik>
        </Stack>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Edit);
