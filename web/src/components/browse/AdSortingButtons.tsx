import { Flex, Heading, HStack, Icon, Link } from "@chakra-ui/react";
import { OrderOption, SortByOption } from "@generated/graphql";
import {
  ORDER_ASCENDING_LABEL,
  ORDER_DESCENDING_LABEL,
  RESULTS_LABEL,
  SORT_BY_PRICE_LABEL,
  SORT_BY_UPLOAD_LABEL,
} from "@utils/strings";
import { ThemeContext } from "@utils/ThemeProvider";
import React, { useContext } from "react";
import { BiTimeFive } from "react-icons/bi";
import { FaArrowDown, FaArrowUp, FaCoins } from "react-icons/fa";

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
  const {
    theme: { BACK_COLOR_LIGHTER, FRONT_COLOR_LIGHTEST, FRONT_COLOR, WHITE },
  } = useContext(ThemeContext);
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
  ];

  return (
    <HStack
      justify={{ base: "start", md: "space-between" }}
      align="center"
      w="full"
      mb={3}
    >
      <Heading size="lg" display={{ base: "none", md: "block" }}>
        {RESULTS_LABEL}
      </Heading>
      <HStack h="fit-content" spacing={0}>
        {[...sortButtons, ...orderButtons].map(
          ({ icon, onClick, isSelected }, i) => (
            <Link>
              <Flex
                align="center"
                flexDir="row"
                bgColor={isSelected ? FRONT_COLOR_LIGHTEST : FRONT_COLOR}
                color={WHITE}
                borderColor={BACK_COLOR_LIGHTER}
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
