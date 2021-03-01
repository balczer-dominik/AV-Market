import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Stack,
  Image,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { ImFilePicture } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { RegularButton } from "../../components/RegularButton";
import {
  useChangeEmailMutation,
  useMeFullQuery,
  useUploadAvatarMutation,
} from "../../generated/graphql";
import {
  LIGHTER_REGULAR_BROWN,
  LIGHTEST_REGULAR_BROWN,
  REGULAR_DARK_BROWN,
} from "../../utils/colors";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  AVATAR_PREVIEW_LABEL,
  CHANGE_AVATAR_SUCCESS,
  CHANGE_EMAIL_SUCCESS,
  CONFIRM_CHANGE_LABEL,
  CURRENT_AVATAR_LABEL,
  CURRENT_EMAIL_LABEL,
  EDIT_PROFILE_LABEL,
  ERROR_GENERIC,
  NEW_AVATAR_LABEL,
  NEW_EMAIL_LABEL,
} from "../../utils/strings";
import { toErrorMap } from "../../utils/toErrorMap";
import { useIsAuth } from "../../utils/useIsAuth";
import { EmailValidator } from "../../utils/validators";

interface ThumbProps {
  file;
}

interface EditProps {}

const Thumb: React.FC<ThumbProps> = ({ file }) => {
  const [state, setState] = useState({ loading: false, thumb: undefined });
  useEffect(() => {
    componentWillReceiveProps();
  }, [file]);

  const componentWillReceiveProps = () => {
    if (!file) {
      return;
    }
    setState({ loading: true, ...state });
    let reader = new FileReader();
    reader.onloadend = () => {
      setState({ loading: false, thumb: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {state.loading ? (
        <Box>loading...</Box>
      ) : (
        <Image src={state.thumb} height={200} width={200} />
      )}
    </>
  );
};

const Edit: React.FC<EditProps> = ({}) => {
  useIsAuth();
  const [{ data: meData, fetching: meFetching }, me] = useMeFullQuery();
  const [, changeEmail] = useChangeEmailMutation();
  const [, uploadAvatar] = useUploadAvatarMutation();
  const toast = useToast();
  return (
    <Layout variant="small">
      {meFetching ? null : (
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
            validationSchema={EmailValidator}
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
                <FormControl mt={4}>
                  <FormLabel htmlFor={"newAvatar"} color={REGULAR_DARK_BROWN}>
                    {NEW_AVATAR_LABEL}
                  </FormLabel>

                  <input
                    type={"file"}
                    accept={"image/*"}
                    id={"newAvatar"}
                    onChange={({ target: { files } }) => {
                      setFieldValue("newAvatar", files[0]);
                    }}
                  />
                  {values.newAvatar ? (
                    <Box>
                      <Text mt={2} color={REGULAR_DARK_BROWN}>
                        {AVATAR_PREVIEW_LABEL}
                      </Text>
                      <Thumb file={values.newAvatar} />
                    </Box>
                  ) : null}
                </FormControl>
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
