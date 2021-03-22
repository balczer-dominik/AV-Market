import { Icon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/switch";
import { ThemeContext } from "../../utils/ThemeProvider";
import React, { useContext } from "react";

interface ThemeSwitcherProps {}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({}) => {
  const {
    theme: { name, SUN, MOON },
    toggleTheme,
  } = useContext(ThemeContext);
  return (
    <HStack p={2} pl={0}>
      <Icon color={MOON} as={MoonIcon} />
      <Switch
        colorScheme="orange"
        onChange={toggleTheme}
        isChecked={name !== "DARK-GREY"}
      />
      <Icon color={SUN} as={SunIcon} />
    </HStack>
  );
};
