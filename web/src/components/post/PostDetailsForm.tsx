import { Box, Flex, FormLabel, Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import { BiText } from "react-icons/bi";
import { FaMoneyBillWave } from "react-icons/fa";
import {
  BASIC_DETAILS_LABEL,
  DESC_LABEL,
  PRICE_LABEL,
  TITLE_LABEL,
  WearValues,
  WEAR_LABEL,
} from "../../utils/strings";
import { ThemeContext } from "../../utils/ThemeProvider";
import { InputField } from "../InputField";
import { WearTile } from "./WearTile";

interface PostDetailsFormProps {
  display: Boolean;
  category: { main: string; sub: string; wear: string };
  setCategory: (
    value: React.SetStateAction<{
      main: string;
      sub: string;
      wear: string;
    }>
  ) => void;
}

export const PostDetailsForm: React.FC<PostDetailsFormProps> = ({
  display,
  category,
  setCategory,
}) => {
  const {
    theme: { ACCENT_COLOR },
  } = useContext(ThemeContext);
  return (
    <Box display={display ? "block" : "none"}>
      <Heading my={4} size="md">
        {BASIC_DETAILS_LABEL}
      </Heading>
      <InputField name="title" label={TITLE_LABEL} icon={BiText} />
      <InputField
        name="price"
        label={PRICE_LABEL}
        icon={FaMoneyBillWave}
        type="number"
      />
      <InputField name="desc" label={DESC_LABEL} type="textarea" />
      <FormLabel color={ACCENT_COLOR} mt={4}>
        {WEAR_LABEL}
      </FormLabel>
      <Flex w="100%" justify="space-between" borderRadius="10px" h={24}>
        {WearValues.map((w, i) => (
          <WearTile
            leftmost={i === 0}
            rightmost={i === WearValues.length - 1}
            name={w}
            disabled={category.wear !== w}
            select={() =>
              setCategory({ wear: w, main: category.main, sub: category.sub })
            }
          />
        ))}
      </Flex>
    </Box>
  );
};
