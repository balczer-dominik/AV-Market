import React, { useState } from "react";
import { ColorThemes } from "../utils/colors";
type ThemeMode = "LIGHT" | "DARK";
export type Theme = {
  name: string;
  FRONT_COLOR: string;
  FRONT_COLOR_ALT: string;
  FRONT_COLOR_DARKER: string;
  FRONT_COLOR_LIGHTER: string;
  FRONT_COLOR_LIGHTER_ALT: string;
  FRONT_COLOR_LIGHTEST: string;
  BACK_COLOR: string;
  BACK_COLOR_LIGHTER: string;
  BACK_COLOR_LIGHTEST: string;
  BACK_COLOR_LIGHTEST_ALT: string;
  BACK_COLOR_SEE_THROUGH: string;
  ACCENT_COLOR: string;
  WHITE: string;
  BG_COLOR: string;
  SUN: string;
  MOON: string;
};
type ThemeContext = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = React.createContext<ThemeContext>(
  {} as ThemeContext
);

export const ThemeProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>("DARK");
  const toggleMode = () => {
    setMode(mode === "LIGHT" ? "DARK" : "LIGHT");
  };

  const Modes = ColorThemes;

  return (
    <ThemeContext.Provider
      value={{ theme: Modes[mode], toggleTheme: toggleMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
