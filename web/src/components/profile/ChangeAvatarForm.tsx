import { Formik, Form } from "formik";
import React from "react";
import {
  useMeAvatarQuery,
  useUploadAvatarMutation,
} from "../../generated/graphql";
import {
  CHANGE_AVATAR_SUCCESS,
  ERROR_GENERIC,
  CONFIRM_CHANGE_LABEL,
  CURRENT_AVATAR_LABEL,
} from "src/resources/strings";
import { useBetterToast } from "@utils/hooks/useBetterToast";
import { FileUploader } from "../FileUploader";
import { RegularButton } from "../RegularButton";
import { Text, Image, Box } from "@chakra-ui/react";

interface ChangeAvatarFormProps {}

export const ChangeAvatarForm: React.FC<ChangeAvatarFormProps> = ({}) => {
  const [, uploadAvatar] = useUploadAvatarMutation();
  const [{ data }, meAvatar] = useMeAvatarQuery();
  const toast = useBetterToast();
  return (
    <Formik
      initialValues={{
        newAvatar: null,
      }}
      onSubmit={async ({ newAvatar }) => {
        const result = await uploadAvatar({ avatar: newAvatar });
        if (result.data.uploadAvatar) {
          toast("success", CHANGE_AVATAR_SUCCESS);
          meAvatar();
          return;
        }
        toast("error", ERROR_GENERIC);
      }}
    >
      {({ setFieldValue, isSubmitting, values: { newAvatar } }) => (
        <Form>
          <FileUploader
            setter={setFieldValue}
            fieldName={"newAvatar"}
            file={newAvatar}
          />
          {data ? (
            <Box my={3}>
              <Text mb={1}>{CURRENT_AVATAR_LABEL}</Text>
              <Image src={`/avatar/${data.me.avatar}.png`} w={100} h={100} />
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
