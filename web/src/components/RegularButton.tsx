import { Button } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ThemeContext } from "../utils/ThemeProvider";

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
  const {
    theme: {
      FRONT_COLOR_DARKER,
      FRONT_COLOR_LIGHTER,
      FRONT_COLOR,
      ACCENT_COLOR,
      WHITE,
    },
  } = useContext(ThemeContext);
  return (
    <Button
      disabled={disabled.valueOf()}
      mt={mt}
      type={onClick ? "button" : "submit"}
      isLoading={spinner}
      onClick={onClick}
      borderWidth={variant === "solid" ? null : "0.15rem"}
      borderColor={variant === "solid" ? null : FRONT_COLOR_DARKER}
      bgColor={variant === "solid" ? FRONT_COLOR : null}
      _hover={variant === "solid" ? { bgColor: FRONT_COLOR_LIGHTER } : null}
      color={variant === "solid" ? WHITE : ACCENT_COLOR}
      w={w ?? "unset"}
    >
      {children}
    </Button>
  );
};
