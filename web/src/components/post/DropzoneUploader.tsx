import { Box, SimpleGrid, Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import React, { useCallback, useContext } from "react";
import Dropzone from "react-dropzone";
import { DROPZONE_TEXT } from "src/resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { DropzoneThumb } from "@components/DropzoneThumb";

interface DropzoneUploaderProps {
  fieldName: string;
  setter: (field: string, value: any, shouldValidate?: boolean) => void;
  images: any[];
}

export const DropzoneUploader: React.FC<DropzoneUploaderProps> = ({
  fieldName,
  setter,
  images,
}) => {
  const {
    theme: { FRONT_COLOR },
  } = useContext(ThemeContext);
  const handleDrop = (acceptedFiles) => {
    setter(fieldName, images.concat(acceptedFiles));
  };

  return (
    <Box m={2}>
      <Dropzone onDrop={handleDrop} accept="image/jpeg, image/png">
        {({ getRootProps, getInputProps }) => (
          <Flex
            justify="center"
            align="center"
            p={4}
            h={100}
            borderColor={FRONT_COLOR}
            borderStyle={"dashed"}
            borderWidth={2}
            borderRadius={"10px"}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Text>{DROPZONE_TEXT}</Text>
          </Flex>
        )}
      </Dropzone>
      {images ? (
        <SimpleGrid
          minChildWidth={"200px"}
          spacing={4}
          alignItems={"center"}
          mt={4}
        >
          {images.map((image) => (
            <DropzoneThumb file={image} dropzone />
          ))}
        </SimpleGrid>
      ) : null}
    </Box>
  );
};
