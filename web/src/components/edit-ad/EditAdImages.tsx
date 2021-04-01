import {
  Heading,
  SimpleGrid,
  Image,
  Flex,
  Icon,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { DropzoneUploader } from "@components/post/DropzoneUploader";
import { RegularButton } from "@components/RegularButton";
import {
  useDeleteAdImageMutation,
  useUploadAdImagesMutation,
} from "@generated/graphql";
import {
  DELETE_IMAGE_SUCCESS,
  ERROR_GENERIC,
  HANDLE_IMAGES,
  IMAGE_UPLOAD_FAIL,
  IMAGE_UPLOAD_SUCCESS,
  PHOTOS_LABEL,
  UPLOAD_IMAGE_LABEL,
} from "@resources/strings";
import { formatAdSrc } from "@utils/formatters/formatLinks";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { useBetterToast } from "@utils/hooks/useBetterToast";
import React, { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

interface EditAdImagesProps {
  adId: number;
  images: string[];
}

export const EditAdImages: React.FC<EditAdImagesProps> = ({
  images: _images,
  adId,
}) => {
  const [images, setImages] = useState({
    current: _images,
    toUpload: [],
  });
  const {
    theme: { FRONT_COLOR_LIGHTEST, BACK_COLOR_LIGHTEST },
  } = useContext(ThemeContext);
  const [, deleteImage] = useDeleteAdImageMutation();
  const toast = useBetterToast();
  const [, uploadImages] = useUploadAdImagesMutation();

  const handleIncomingImage = (
    _field: string,
    value: any,
    _shouldValidate?: boolean
  ) => {
    setImages({
      ...images,
      toUpload: images.toUpload.concat(value),
    });
  };
  const handleUploadImages = async () => {
    const result = (await uploadImages({ adId, images: images.toUpload })).data
      .uploadAdImages;

    if (!result) {
      toast("error", IMAGE_UPLOAD_FAIL);
      return;
    }

    toast("success", IMAGE_UPLOAD_SUCCESS);
    setImages({ current: [...images.current, ...result], toUpload: [] });
  };

  return (
    <>
      <Heading
        size="lg"
        my={4}
        mt={4}
        pb={2}
        w="full"
        borderBottom={`2px solid ${FRONT_COLOR_LIGHTEST}`}
      >
        {PHOTOS_LABEL}
      </Heading>
      <DropzoneUploader
        fieldName="images"
        setter={handleIncomingImage}
        images={images.toUpload}
      />
      {images.toUpload.length !== 0 ? (
        <RegularButton onClick={handleUploadImages}>
          {UPLOAD_IMAGE_LABEL}
        </RegularButton>
      ) : null}

      {images ? (
        <>
          <Heading
            size="lg"
            my={4}
            mt={4}
            pb={2}
            w="full"
            borderBottom={`2px solid ${FRONT_COLOR_LIGHTEST}`}
          >
            {HANDLE_IMAGES}
          </Heading>
          <SimpleGrid
            minChildWidth={"150px"}
            spacing={4}
            alignItems={"center"}
            mt={4}
          >
            {images.current.map((image, i) => (
              <Flex
                justifyContent="center"
                position="relative"
                bgColor={BACK_COLOR_LIGHTEST}
                maxW="300px"
              >
                <Image
                  height="200px"
                  w="auto"
                  objectFit="contain"
                  src={formatAdSrc(image)}
                />
                <Box top={2} right={2} position="absolute">
                  <RegularButton
                    onClick={async () => {
                      const success = (await deleteImage({ src: image })).data
                        ?.deleteAdImage;

                      if (!success) {
                        toast("error", ERROR_GENERIC);
                        return;
                      }
                      toast("success", DELETE_IMAGE_SUCCESS);
                      setImages({
                        ...images,
                        current: images.current.filter(
                          (_, findex) => findex !== i
                        ),
                      });
                    }}
                  >
                    <Icon as={FaTrash} />
                  </RegularButton>
                </Box>
              </Flex>
            ))}
          </SimpleGrid>
        </>
      ) : null}
    </>
  );
};
