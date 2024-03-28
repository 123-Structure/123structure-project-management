import resolveConfig from "tailwindcss/resolveConfig";
import twConfig from "../../../tailwind.config";

const tailwindConfig = resolveConfig(twConfig);

// Couleurs primaires
export const primaryColor =
  tailwindConfig.theme.colors.primary["DEFAULT"];
export const primaryColorForeground =
  tailwindConfig.theme.colors.primary["foreground"];

// Couleurs secondaires
export const secondaryColor =
  tailwindConfig.theme.colors.secondary["DEFAULT"];
export const secondaryColorForeground =
  tailwindConfig.theme.colors.secondary["foreground"];

// Couleurs destructives
export const destructiveColor =
  tailwindConfig.theme.colors.destructive["DEFAULT"];
export const destructiveColorForeground =
  tailwindConfig.theme.colors.destructive["foreground"];

// Couleurs muted
export const mutedColor = tailwindConfig.theme.colors.muted["DEFAULT"];
export const mutedColorForeground =
  tailwindConfig.theme.colors.muted["foreground"];

// Couleurs accent
export const accentColor = tailwindConfig.theme.colors.accent["DEFAULT"];
export const accentColorForeground =
  tailwindConfig.theme.colors.accent["foreground"];

// Couleurs popover
export const popoverColor =
  tailwindConfig.theme.colors.popover["DEFAULT"];
export const popoverColorForeground =
  tailwindConfig.theme.colors.popover["foreground"];

// Couleurs card
export const cardColor = tailwindConfig.theme.colors.card["DEFAULT"];
export const cardColorForeground =
  tailwindConfig.theme.colors.card["foreground"];

// Autres couleurs
export const borderColor = tailwindConfig.theme.colors.border;
export const inputColor = tailwindConfig.theme.colors.input;
export const ringColor = tailwindConfig.theme.colors.ring;
export const backgroundColor = tailwindConfig.theme.colors.background;
export const foregroundColor = tailwindConfig.theme.colors.foreground;

export default tailwindConfig;
