import { Box, SimpleGrid, Text } from "@chakra-ui/layout";
import { Flex, Image } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { REGULAR_BROWN } from "../../utils/colors";
import { DROPZONE_TEXT } from "../../utils/strings";
import { DropzoneThumb } from "./DropzoneThumb";

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
  const handleDrop = useCallback((acceptedFiles) => {
    setter(fieldName, images.concat(acceptedFiles));
  }, []);

  return (
    <Box m={2}>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <Flex
            justify="center"
            align="center"
            p={4}
            h={100}
            borderColor={REGULAR_BROWN}
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
