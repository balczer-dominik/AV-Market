const currentMode: "LIGHT" | "DARK" = "LIGHT";

export const themes = {
  DARK: {
    FRONT_COLOR: "#181a1b",
    FRONT_COLOR_DARKER: "#141516",
    FRONT_COLOR_LIGHTER: "#212121",
    FRONT_COLOR_LIGHTEST: "#2e2e2e",
    BACK_COLOR: "#474747",
    BACK_COLOR_LIGHTER: "#aaaaaa",
    BACK_COLOR_LIGHTEST: "#e7e7e7",
    BACK_COLOR_SEE_THROUGH: "rgba(218, 212, 190, 0.9)",
    ACCENT_COLOR: "#30302c",
    WHITE: "white",
    BG_COLOR: "#212121",
  },
  LIGHT: {
    FRONT_COLOR: "#777672",
    FRONT_COLOR_DARKER: "#63625d",
    FRONT_COLOR_LIGHTER: "#91908c",
    FRONT_COLOR_LIGHTEST: "#b0aea7",
    BACK_COLOR: "#DAD4BE",
    BACK_COLOR_LIGHTER: "#e3deca",
    BACK_COLOR_LIGHTEST: "#edeadf",
    BACK_COLOR_SEE_THROUGH: "rgba(218, 212, 190, 0.9)",
    ACCENT_COLOR: "#30302c",
    WHITE: "white",
    BG_COLOR: "white",
  },
};

//Default
export const FRONT_COLOR = themes[currentMode].FRONT_COLOR;
export const FRONT_COLOR_DARKER = themes[currentMode].FRONT_COLOR_DARKER;
export const FRONT_COLOR_LIGHTER = themes[currentMode].FRONT_COLOR_LIGHTER;
export const FRONT_COLOR_LIGHTEST = themes[currentMode].FRONT_COLOR_LIGHTEST;
export const BACK_COLOR = themes[currentMode].BACK_COLOR;
export const BACK_COLOR_LIGHTER = themes[currentMode].BACK_COLOR_LIGHTER;
export const BACK_COLOR_LIGHTEST = themes[currentMode].BACK_COLOR_LIGHTEST;
export const BACK_COLOR_SEE_THROUGH =
  themes[currentMode].BACK_COLOR_SEE_THROUGH;
export const ACCENT_COLOR = themes[currentMode].ACCENT_COLOR;
export const WHITE = themes[currentMode].WHITE;
export const BG_COLOR = themes[currentMode].BG_COLOR;
