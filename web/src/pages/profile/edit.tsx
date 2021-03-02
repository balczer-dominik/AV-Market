import { Heading, Stack, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
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
import { ChangeEmailValidator } from "../../utils/validators";

const Edit: React.FC<{}> = ({}) => {
  useIsAuth();
  const [{ data: meData, fetching: meFetching }, me] = useMeFullQuery();
  const [, changeEmail] = useChangeEmailMutation();
  const [, uploadAvatar] = useUploadAvatarMutation();
  const toast = useToast();
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

              toast({
                title: CHANGE_EMAIL_SUCCESS,
                status: "success",
                duration: 5000,
                position: "bottom-left",
              });
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
                toast({
                  title: CHANGE_AVATAR_SUCCESS,
                  status: "success",
                  duration: 5000,
                  position: "bottom-left",
                });
                return;
              }
              toast({
                title: ERROR_GENERIC,
                status: "error",
                duration: 5000,
                position: "bottom-left",
              });
            }}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form>
                <FileUploader
                  image={values.newAvatar}
                  setter={setFieldValue}
                  fieldName={"newAvatar"}
                />
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
