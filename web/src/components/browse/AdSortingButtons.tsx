import { HStack, Heading, Link, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { BiTimeFive } from "react-icons/bi";
import { FaArrowDown, FaArrowUp, FaCoins } from "react-icons/fa";
import { OrderOption, SortByOption } from "../../generated/graphql";
import {
  LIGHTER_REGULAR_LIGHT_BROWN,
  LIGHTEST_REGULAR_BROWN,
  REGULAR_BROWN,
} from "../../utils/colors";
import {
  ORDER_ASCENDING_LABEL,
  ORDER_DESCENDING_LABEL,
  RESULTS_LABEL,
  SORT_BY_PRICE_LABEL,
  SORT_BY_UPLOAD_LABEL,
} from "../../utils/strings";

interface AdSortingButtonsProps {
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

export const AdSortingButtons: React.FC<AdSortingButtonsProps> = ({
  setter,
  state,
}) => {
  const sortButtons = [
    {
      aria: SORT_BY_UPLOAD_LABEL,
      isSelected: state.sortBy === SortByOption.CreatedAt,
      icon: BiTimeFive,
      onClick: () => {
        setter({
          ...state,
          sortBy: SortByOption.CreatedAt,
        });
      },
    },
    {
      aria: SORT_BY_PRICE_LABEL,
      isSelected: state.sortBy === SortByOption.Price,
      icon: FaCoins,
      onClick: () => {
        setter({
          ...state,
          sortBy: SortByOption.Price,
        });
      },
    },
  ];

  const orderButtons = [
    {
      aria: ORDER_ASCENDING_LABEL,
      isSelected: state.order === OrderOption.Asc,
      icon: FaArrowUp,
      onClick: () => {
        setter({
          ...state,
          order: OrderOption.Asc,
        });
      },
    },
    {
      aria: ORDER_DESCENDING_LABEL,
      isSelected: state.order === OrderOption.Desc,
      icon: FaArrowDown,
      onClick: () => {
        setter({
          ...state,
          order: OrderOption.Desc,
        });
      },
    },
  ];

  return (
    <HStack
      justify={{ base: "start", md: "space-between" }}
      align="center"
      w="full"
    >
      <Heading size="lg" display={{ base: "none", md: "block" }}>
        {RESULTS_LABEL}
      </Heading>
      <HStack h="fit-content" spacing={0}>
        {[...sortButtons, ...orderButtons].map(
          ({ aria, icon, onClick, isSelected }, i) => (
            <Link>
              <Flex
                align="center"
                flexDir="row"
                bgColor={isSelected ? LIGHTEST_REGULAR_BROWN : REGULAR_BROWN}
                color="white"
                borderColor={LIGHTER_REGULAR_LIGHT_BROWN}
                borderStyle="solid"
                borderWidth="1px"
                borderLeftRadius={
                  i === 0 || i === sortButtons.length ? "5px" : "unset"
                }
                borderRightRadius={
                  i === sortButtons.length - 1 ||
                  i === sortButtons.length + orderButtons.length - 1
                    ? "5px"
                    : "unset"
                }
                style={
                  isSelected ? { boxShadow: "inset 0 0 4px #555555" } : null
                }
                ml={i === sortButtons.length ? 2 : 0}
                p={2}
              >
                <Icon as={icon} onClick={onClick} />
              </Flex>
            </Link>
          )
        )}
      </HStack>
    </HStack>
  );
};
