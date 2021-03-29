import { Heading, HStack, Icon, Text } from "@chakra-ui/react";
import { RegularButton } from "@components/RegularButton";
import { DELETE_LABEL, EDIT_LABEL, THIS_AD_IS_YOURS } from "@resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { useMeId } from "@utils/hooks/useMeId";
import React, { useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface AdControlsProps {
  adId: number;
  ownerId: number;
}

export const AdControls: React.FC<AdControlsProps> = ({ ownerId, adId }) => {
  const {
    theme: { FRONT_COLOR_ALT, WHITE },
  } = useContext(ThemeContext);

  const userId = useMeId();

  return (
    <>
      {userId === ownerId ? (
        <HStack
          bgColor={FRONT_COLOR_ALT}
          color={WHITE}
          w="full"
          borderRadius="10px"
          h="60px"
          mt={4}
          p={4}
          justify="space-between"
        >
          <Heading size="md">{THIS_AD_IS_YOURS}</Heading>
          <HStack>
            <RegularButton variant="edit" href={`/ad/edit/${adId}`}>
              <HStack>
                <FaEdit />
                <Text display={{ base: "none", md: "block" }}>
                  {EDIT_LABEL}
                </Text>
              </HStack>
            </RegularButton>
            <RegularButton variant="delete" href={`/ad/delete/${adId}`}>
              <HStack>
                <FaTrash />
                <Text display={{ base: "none", md: "block" }}>
                  {DELETE_LABEL}
                </Text>
              </HStack>
            </RegularButton>
          </HStack>
        </HStack>
      ) : null}
    </>
  );
};
