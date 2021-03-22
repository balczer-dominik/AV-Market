import { Button } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ThemeContext } from "@utils/ThemeProvider";

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
  w?: string | { base: string; md: string };
  h?: string;
}

export const RegularButton: React.FC<SubmitButtonProps> = ({
  spinner,
  children,
  variant = "solid",
  mt,
  onClick,
  disabled = false,
  w,
  h,
}) => {
  const {
    theme: {
      FRONT_COLOR_DARKER,
      FRONT_COLOR_LIGHTER_ALT,
      FRONT_COLOR_ALT,
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
      bgColor={variant === "solid" ? FRONT_COLOR_ALT : null}
      _hover={variant === "solid" ? { bgColor: FRONT_COLOR_LIGHTER_ALT } : null}
      color={variant === "solid" ? WHITE : ACCENT_COLOR}
      w={w ?? "unset"}
      h={h ?? "2.5rem"}
    >
      {children}
    </Button>
  );
};
