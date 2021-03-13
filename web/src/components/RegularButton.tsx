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
  onClick?: () => void;
  disabled?: Boolean;
  w?: string;
}

export const RegularButton: React.FC<SubmitButtonProps> = ({
  spinner,
  children,
  variant = "solid",
  mt,
  onClick,
  disabled = false,
  w,
}) => {
  return (
    <Button
      disabled={disabled.valueOf()}
      mt={mt}
      type={onClick ? "button" : "submit"}
      isLoading={spinner}
      onClick={onClick}
      borderWidth={variant === "solid" ? null : "0.15rem"}
      borderColor={variant === "solid" ? null : DARKER_REGULAR_BROWN}
      bgColor={variant === "solid" ? REGULAR_BROWN : null}
      _hover={variant === "solid" ? { bgColor: LIGHTER_REGULAR_BROWN } : null}
      color={variant === "solid" ? "white" : REGULAR_DARK_BROWN}
      w={w ?? "unset"}
    >
      {children}
    </Button>
  );
};
