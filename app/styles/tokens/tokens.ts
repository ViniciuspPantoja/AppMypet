export const colors = {
  // Vinho
  wine: "#7B1E2E",
  wineDark: "#4A1020",
  wineMedium: "#5A1520",
  wineLight: "#9B2E42",
  cardBg: "#8B2535",

  // Creme
  cream: "#F5ECD7",
  creamDark: "#EAD9BC",
  creamTextSecondary: "#9B4020",

  // Terracota
  terracotta: "#D4623A",
  terracottaLight: "#E8845F",
  terracottaDark: "#C05020",

  // Utilitários
  white: "#FFFFFF",
  textHint: "#B08860",
  greenOk: "#2D7A4F",
  statusError: "#FF6B6B",
  statusSuccess: "#6BCB77",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 50,
} as const;

export const typography = {
  title: {
    fontSize: 28,
    fontWeight: "900" as const,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "700" as const,
  },
  body: {
    fontSize: 14,
    fontWeight: "400" as const,
  },
  caption: {
    fontSize: 11,
    fontWeight: "600" as const,
    letterSpacing: 0.5,
  },
  label: {
    fontSize: 9,
    fontWeight: "800" as const,
    letterSpacing: 0.8,
  },
} as const;