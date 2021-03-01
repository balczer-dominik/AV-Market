import { Box, FormControl, FormLabel, Text, Image } from "@chakra-ui/react";
import { resolve } from "path";
import React, { useEffect, useState } from "react";
import { REGULAR_DARK_BROWN } from "../utils/colors";
import { NEW_AVATAR_LABEL, AVATAR_PREVIEW_LABEL } from "../utils/strings";

interface FileUploaderProps {
  image;
  fieldName: string;
  setter: (field: string, value: any, shouldValidate?: boolean) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  image,
  fieldName,
  setter: setFieldValue,
}) => {
  const [state, setState] = useState({
    loading: false,
    thumb: undefined,
    invalid: false,
  });
  useEffect(() => {
    refreshPreview();
  }, [image]);

  let reader = new FileReader();

  useEffect(() => {
    setState({ thumb: reader.result, ...state });
    console.log(state.thumb);
    console.log(reader.result);
  }, [reader.result]);

  const refreshPreview = () => {
    if (!image) {
      return;
    }
    setState({ loading: true, ...state });

    reader.onload = () => {
      setState({ loading: false, thumb: reader.result, ...state });
    };
    reader.readAsDataURL(image);
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
        onChange={({ target: { files } }) => {
          const file = files[0];
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
      {image ? (
        <Box>
          <Text mt={2} color={REGULAR_DARK_BROWN}>
            {AVATAR_PREVIEW_LABEL}
          </Text>
          {state.loading ? (
            <Box>loading...</Box>
          ) : (
            <Box>
              <Text>{state.thumb}</Text>
              <Image src={state.thumb} height={200} width={200} />
            </Box>
          )}
        </Box>
      ) : null}
    </FormControl>
  );
};
