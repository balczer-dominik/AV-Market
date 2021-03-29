import React, { useEffect, useState } from "react";
import { ColorThemes } from "@resources/colors";
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
  RED: string;
};
type ThemeContext = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = React.createContext<ThemeContext>(
  {} as ThemeContext
);

export const ThemeProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>("LIGHT");
  const toggleMode = () => {
    const newMode = mode === "LIGHT" ? "DARK" : "LIGHT";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  };

  useEffect(() => {
    if (window) {
      setMode((localStorage.getItem("mode") as ThemeMode) ?? "LIGHT");
    }
  }, [typeof window]);

  return (
    <ThemeContext.Provider
      value={{ theme: ColorThemes[mode], toggleTheme: toggleMode }}
    >
      <style jsx global>{`
        body {
          background-color: ${mode ? ColorThemes[mode].BG_COLOR : "unset"};
        }
      `}</style>
      {children}
    </ThemeContext.Provider>
  );
};
