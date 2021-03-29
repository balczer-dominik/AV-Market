import {
  Heading,
  SimpleGrid,
  Image,
  Flex,
  Icon,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { RegularButton } from "@components/RegularButton";
import { useDeleteAdImageMutation } from "@generated/graphql";
import {
  DELETE_IMAGE,
  DELETE_IMAGE_SUCCESS,
  ERROR_GENERIC,
  PHOTOS_LABEL,
} from "@resources/strings";
import { formatAdSrc } from "@utils/formatters/formatLinks";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { useBetterToast } from "@utils/hooks/useBetterToast";
import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";

interface EditAdImagesProps {
  adId: number;
  images: string[];
}

export const EditAdImages: React.FC<EditAdImagesProps> = ({ images }) => {
  const {
    theme: { FRONT_COLOR_LIGHTEST, BACK_COLOR_LIGHTEST },
  } = useContext(ThemeContext);
  const [, deleteImage] = useDeleteAdImageMutation();
  const toast = useBetterToast();
  return (
    <>
      <Heading
        size="lg"
        my={2}
        mt={4}
        pb={2}
        w="full"
        borderBottom={`2px solid ${FRONT_COLOR_LIGHTEST}`}
      >
        {PHOTOS_LABEL}
      </Heading>
      {images ? (
        <SimpleGrid
          minChildWidth={"150px"}
          spacing={4}
          alignItems={"center"}
          mt={4}
        >
          {images.map((image, i) => (
            <Flex
              justifyContent="center"
              position="relative"
              bgColor={BACK_COLOR_LIGHTEST}
              maxW="300px"
            >
              <Image height="200px" w="auto" src={formatAdSrc(image)} />
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
                    images.splice(i, 1);
                  }}
                >
                  <Icon as={FaTrash} />
                </RegularButton>
              </Box>
            </Flex>
          ))}
        </SimpleGrid>
      ) : null}
    </>
  );
};
