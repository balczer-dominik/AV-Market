import { Box, Flex, FormLabel, Heading, NumberInput } from "@chakra-ui/react";
import { NumberInputControl } from "formik-chakra-ui";
import React from "react";
import { BiText } from "react-icons/bi";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import {
  REGULAR_BROWN,
  REGULAR_DARK_BROWN,
  REGULAR_LIGHT_BROWN,
} from "../../utils/colors";
import {
  BASIC_DETAILS_LABEL,
  DESC_LABEL,
  POST_LABEL,
  PRICE_LABEL,
  TITLE_LABEL,
  WearValues,
  WEAR_LABEL,
} from "../../utils/strings";
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
      <FormLabel color={REGULAR_DARK_BROWN} mt={4}>
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
