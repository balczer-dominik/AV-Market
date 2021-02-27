import { Button } from "@chakra-ui/react";
import React from "react";
import {
  DARKER_REGULAR_BROWN,
  LIGHTER_REGULAR_BROWN,
  REGULAR_BROWN,
  REGULAR_DARK_BROWN,
} from "../utils/colors";

type ButtonVariant =
  | "link"
  | "outline"
  | (string & {})
  | "ghost"
  | "solid"
  | "unstyled";

interface SubmitButtonProps {
  spinner?: boolean;
  variant?: ButtonVariant;
  mt?: number;
}

export const RegularButton: React.FC<SubmitButtonProps> = ({
  spinner,
  children,
  variant = "solid",
  mt,
}) => {
  return (
    <Button
      mt={mt}
      type="submit"
      isLoading={spinner}
      borderWidth={variant === "solid" ? null : "0.15rem"}
      borderColor={variant === "solid" ? null : DARKER_REGULAR_BROWN}
      bgColor={variant === "solid" ? REGULAR_BROWN : null}
      _hover={variant === "solid" ? { bgColor: LIGHTER_REGULAR_BROWN } : null}
      color={variant === "solid" ? "white" : REGULAR_DARK_BROWN}
    >
      {children}
    </Button>
  );
};
