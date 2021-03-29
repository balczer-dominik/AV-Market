import { Box, HStack } from "@chakra-ui/layout";
import { Heading, Icon, Link, useDisclosure } from "@chakra-ui/react";
import { InputField } from "@components/InputField";
import { RegularButton } from "@components/RegularButton";
import { OrderOption, SortByOption } from "@generated/graphql";
import {
  CITY_LABEL,
  CLEAR_FILTER_LABEL,
  counties,
  COUNTY_LABEL,
  FILTERS_LABEL,
  FILTER_LABEL,
  PRICE_LOWER_LABEL,
  PRICE_UPPER_LABEL,
  TITLE_LABEL,
  WearValuesSearch,
  WEAR_LABEL,
} from "src/resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { SearchAdValidation } from "@utils/validators";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { BiText } from "react-icons/bi";
import { FaCity, FaMapMarkerAlt } from "react-icons/fa";
import { GiShinyEntrance } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { RiCoinFill, RiCoinLine } from "react-icons/ri";

interface AdSearchboxProps {
  setter: React.Dispatch<
    React.SetStateAction<{
      sortBy: SortByOption;
      order: OrderOption;
      title: string;
      wear: any;
      priceLower: any;
      priceUpper: any;
      county: any;
      city: any;
    }>
  >;
  state: {
    sortBy: SortByOption;
    order: OrderOption;
    title: string;
    wear: any;
    priceLower: any;
    priceUpper: any;
    county: any;
    city: any;
  };
}

export const AdSearchbox: React.FC<AdSearchboxProps> = ({ setter, state }) => {
  const {
    theme: { BACK_COLOR_LIGHTEST, FRONT_COLOR },
  } = useContext(ThemeContext);
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box
      bgColor={BACK_COLOR_LIGHTEST}
      borderColor={FRONT_COLOR}
      borderRadius="10px"
      w={{ base: "full", md: "32%" }}
      mt={2}
      p={2}
    >
      <Heading size="md" mt={1} display={{ base: "none", md: "block" }}>
        {FILTERS_LABEL}
      </Heading>
      <HStack
        justify="space-between"
        align="center"
        display={{ base: "flex", md: "none" }}
        as={Link}
        onClick={onToggle}
        style={{ textDecoration: "none" }}
      >
        <Heading size="md" my={1}>
          {FILTERS_LABEL}
        </Heading>
        <Icon
          as={IoIosArrowDown}
          ml={"auto"}
          transform={isOpen ? null : "rotate(180deg)"}
          transition={"0.3s"}
        />
      </HStack>
      <Box display={{ base: isOpen ? "block" : "none", md: "block" }}>
        <Formik
          initialValues={{
            title: "",
            wear: "",
            priceLower: "",
            priceUpper: "",
            county: "",
            city: "",
          }}
          onSubmit={({ title, wear, priceLower, priceUpper, county, city }) => {
            setter({
              ...state,
              title,
              wear,
              priceLower: parseInt(priceLower),
              priceUpper: parseInt(priceUpper),
              county,
              city,
            });
          }}
          validationSchema={SearchAdValidation}
        >
          {({ resetForm, submitForm }) => (
            <Form>
              <InputField name="title" label={TITLE_LABEL} icon={BiText} />
              <InputField
                name="priceLower"
                label={PRICE_LOWER_LABEL}
                icon={RiCoinLine}
              />
              <InputField
                name="priceUpper"
                label={PRICE_UPPER_LABEL}
                icon={RiCoinFill}
              />
              <InputField
                name="wear"
                label={WEAR_LABEL}
                select={WearValuesSearch}
                icon={GiShinyEntrance}
              />
              <InputField
                name="county"
                label={COUNTY_LABEL}
                select={counties}
                icon={FaMapMarkerAlt}
              />
              <InputField name="city" label={CITY_LABEL} icon={FaCity} />

              <HStack mt={4} justify="space-between">
                <RegularButton>{FILTER_LABEL}</RegularButton>
                <RegularButton
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    submitForm();
                  }}
                >
                  {CLEAR_FILTER_LABEL}
                </RegularButton>
              </HStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
