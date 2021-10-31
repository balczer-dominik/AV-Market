import { Tag } from "@chakra-ui/tag";
import { formatPrice } from "@utils/formatters/formatPrice";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import React, { useContext } from "react";

interface PriceTagProps {
  price: number;
  invertColors?: boolean;
}

export const PriceTag: React.FC<PriceTagProps> = ({ price, invertColors }) => {
  const {
    theme: { FRONT_COLOR_ALT, WHITE, FRONT_COLOR_LIGHTEST },
  } = useContext(ThemeContext);

  return (
    <Tag
      bgColor={invertColors ? FRONT_COLOR_LIGHTEST : FRONT_COLOR_ALT}
      w="fit-content"
      color={WHITE}
    >
      {formatPrice(price)}
    </Tag>
  );
};
