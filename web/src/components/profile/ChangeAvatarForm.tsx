import { Formik, Form } from "formik";
import React from "react";
import { useUploadAvatarMutation } from "../../generated/graphql";
import {
  CHANGE_AVATAR_SUCCESS,
  ERROR_GENERIC,
  CONFIRM_CHANGE_LABEL,
} from "../../utils/strings";
import { useBetterToast } from "../../utils/useBetterToast";
import { FileUploader } from "../FileUploader";
import { RegularButton } from "../RegularButton";

interface ChangeAvatarFormProps {}

export const ChangeAvatarForm: React.FC<ChangeAvatarFormProps> = ({}) => {
  const [, uploadAvatar] = useUploadAvatarMutation();
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
  );
};
