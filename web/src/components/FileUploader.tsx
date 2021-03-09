import { Box, FormControl, FormLabel, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { REGULAR_DARK_BROWN } from "../utils/colors";
import { NEW_AVATAR_LABEL } from "../utils/strings";

interface FileUploaderProps {
  fieldName: string;
  setter: (field: string, value: any, shouldValidate?: boolean) => void;
  file?: any;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  fieldName,
  setter: setFieldValue,
  file,
}) => {
  const [state, setState] = useState(undefined);

  useEffect(() => {
    if (!file) {
      return;
    }
    setState(() => {
      let reader = new FileReader();
      reader.onloadend = () => {
        setState(reader.result);
      };

      reader.readAsDataURL(file);
    });
  }, [file]);

  const handleChange = ({ target: { files } }) => {
    const file: File = files[0];
    if (!file) {
      return;
    }
    if (["image/png", "image/jpeg", "image/gif"].indexOf(file.type) === -1) {
      setState({ invalid: true, ...state });
      return;
    }

    setFieldValue(fieldName, file);
  };

  return (
    <FormControl mt={4}>
      <FormLabel htmlFor={"newAvatar"} color={REGULAR_DARK_BROWN}>
        {NEW_AVATAR_LABEL}
      </FormLabel>

      <input
        type={"file"}
        accept={"image/*"}
        id={"newAvatar"}
        onChange={handleChange}
      />
    </FormControl>
  );
};
