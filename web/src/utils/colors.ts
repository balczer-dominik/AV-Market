export var currentMode: "LIGHT" | "DARK" = "DARK";

export const themes = {
  DARK: {
    FRONT_COLOR: "#898989",
    FRONT_COLOR_ALT: "#505050",
    FRONT_COLOR_DARKER: "#a8a8a8",
    FRONT_COLOR_LIGHTER: "#8c8c8c",
    FRONT_COLOR_LIGHTER_ALT: "#474747",
    FRONT_COLOR_LIGHTEST: "#3e3e3e",
    BACK_COLOR: "#333333",
    BACK_COLOR_LIGHTER: "#2d2d2d",
    BACK_COLOR_LIGHTEST: "#222222",
    BACK_COLOR_LIGHTEST_ALT: "#cccccc",
    BACK_COLOR_SEE_THROUGH: "rgba(16, 16, 16, 0.9)",
    ACCENT_COLOR: "#b8b3b3",
    WHITE: "#d7d7d7",
    BG_COLOR: "#1b1b1b",
  },
  LIGHT: {
    FRONT_COLOR: "#777672",
    FRONT_COLOR_ALT: "#777672",
    FRONT_COLOR_DARKER: "#63625d",
    FRONT_COLOR_LIGHTER: "#91908c",
    FRONT_COLOR_LIGHTER_ALT: "#91908c",
    FRONT_COLOR_LIGHTEST: "#b0aea7",
    BACK_COLOR: "#DAD4BE",
    BACK_COLOR_LIGHTER: "#e3deca",
    BACK_COLOR_LIGHTEST: "#edeadf",
    BACK_COLOR_LIGHTEST_ALT: "#edeadf",
    BACK_COLOR_SEE_THROUGH: "rgba(218, 212, 190, 0.9)",
    ACCENT_COLOR: "#30302c",
    WHITE: "white",
    BG_COLOR: "white",
  },
};

//Default
export const FRONT_COLOR = themes[currentMode].FRONT_COLOR;
export const FRONT_COLOR_ALT = themes[currentMode].FRONT_COLOR_ALT;
export const FRONT_COLOR_DARKER = themes[currentMode].FRONT_COLOR_DARKER;
export const FRONT_COLOR_LIGHTER = themes[currentMode].FRONT_COLOR_LIGHTER;
export const FRONT_COLOR_LIGHTER_ALT =
  themes[currentMode].FRONT_COLOR_LIGHTER_ALT;
export const FRONT_COLOR_LIGHTEST = themes[currentMode].FRONT_COLOR_LIGHTEST;
export const BACK_COLOR = themes[currentMode].BACK_COLOR;
export const BACK_COLOR_LIGHTER = themes[currentMode].BACK_COLOR_LIGHTER;
export const BACK_COLOR_LIGHTEST = themes[currentMode].BACK_COLOR_LIGHTEST;
export const BACK_COLOR_LIGHTEST_ALT =
  themes[currentMode].BACK_COLOR_LIGHTEST_ALT;
export const BACK_COLOR_SEE_THROUGH =
  themes[currentMode].BACK_COLOR_SEE_THROUGH;
export const ACCENT_COLOR = themes[currentMode].ACCENT_COLOR;
export const WHITE = themes[currentMode].WHITE;
export const BG_COLOR = themes[currentMode].BG_COLOR;
