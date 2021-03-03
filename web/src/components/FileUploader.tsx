import { FormControl, FormLabel } from "@chakra-ui/react";
import React, { useState } from "react";
import { REGULAR_DARK_BROWN } from "../utils/colors";
import { NEW_AVATAR_LABEL } from "../utils/strings";

interface FileUploaderProps {
  fieldName: string;
  setter: (field: string, value: any, shouldValidate?: boolean) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  fieldName,
  setter: setFieldValue,
}) => {
  const [state, setState] = useState({
    invalid: false,
  });

  return (
    <FormControl mt={4}>
      <FormLabel htmlFor={"newAvatar"} color={REGULAR_DARK_BROWN}>
        {NEW_AVATAR_LABEL}
      </FormLabel>

      <input
        type={"file"}
        accept={"image/*"}
        id={"newAvatar"}
        onChange={({ target: { files } }) => {
          const file = files[0];
          if (!file) {
            return;
          }
          if (
            ["image/png", "image/jpeg", "image/gif"].indexOf(file.type) === -1
          ) {
            setState({ invalid: true, ...state });
            return;
          }
          setState({ invalid: false, ...state });
          setFieldValue(fieldName, file);
        }}
      />
    </FormControl>
  );
};
