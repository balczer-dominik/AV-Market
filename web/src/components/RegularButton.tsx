import { Button, Link } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import NextLink from "next/link";

type ButtonVariant =
  | "link"
  | "outline"
  | (string & {})
  | "ghost"
  | "solid"
  | "unstyled";

interface SubmitButtonProps {
  href?: string;
  spinner?: boolean;
  variant?: ButtonVariant | "edit" | "delete";
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
  href,
}) => {
  const {
    theme: {
      FRONT_COLOR_DARKER,
      FRONT_COLOR_LIGHTER_ALT,
      FRONT_COLOR_ALT,
      ACCENT_COLOR,
      WHITE,
      FRONT_COLOR_LIGHTER,
      RED,
    },
  } = useContext(ThemeContext);

  const bgColor = (variant) => {
    if (variant === "solid") {
      return FRONT_COLOR_ALT;
    }
    if (variant === "edit") {
      return FRONT_COLOR_LIGHTER;
    }
    if (variant === "delete") {
      return RED;
    }
    return null;
  };

  const color = (variant) => {
    if (variant === "solid" || variant === "edit" || variant === "delete") {
      return WHITE;
    }
    return ACCENT_COLOR;
  };

  let button = (
    <Button
      disabled={disabled.valueOf()}
      mt={mt}
      type={onClick ? "button" : "submit"}
      isLoading={spinner}
      onClick={onClick}
      borderWidth={variant === "outline" ? "0.15rem" : null}
      borderColor={variant === "outline" ? FRONT_COLOR_DARKER : null}
      bgColor={bgColor(variant)}
      _hover={variant === "solid" ? { bgColor: FRONT_COLOR_LIGHTER_ALT } : null}
      color={color(variant)}
      w={w ?? "unset"}
      h={h ?? "2.5rem"}
    >
      {children}
    </Button>
  );

  if (href) {
    return (
      <NextLink href={href} passHref>
        <Link
          style={{ textDecoration: "none" }}
          w={w ?? "unset"}
          h={h ?? "2.5rem"}
        >
          {button}
        </Link>
      </NextLink>
    );
  }

  return button;
};
