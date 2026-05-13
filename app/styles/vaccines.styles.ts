import { StyleSheet } from "react-native";

// ── Paleta oficial (MyPetZone) ────────────────────────────────
const colors = {
  wine: "#7B1E2E",
  wineDark: "#4A1020",
  wineMedium: "#5A1520",
  wineLight: "#9B2E42",
  cardBg: "#8B2535",

  cream: "#F5ECD7",
  creamDark: "#EAD9BC",

  terracotta: "#D4623A",
  terracottaDark: "#C05020",

  success: "#6BCB77",
  error: "#FF6B6B",

  textOnWine: "#F8F1E3",
  textMutedOnWine: "rgba(248, 241, 227, 0.60)",

  inkOnCream: "#4A1020",
  inkMutedOnCream: "rgba(74, 16, 32, 0.72)",
};

const RADIUS = {
  card: 20,       // XML usa 20dp nos cards principais
  big: 28,        // linguagem do app (premium)
  pill: 999,
};

const SPACING = {
  xs: 6,
  sm: 10,
  md: 12,  // XML usa muito 12dp
  lg: 16,
  xl: 18,  // XML header: 18dp horizontal
  xxl: 24,
};

const SHADOWS = {
  soft: {
    shadowColor: "#120509",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 10,
  },
  card: {
    shadowColor: "#120509",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.30,
    shadowRadius: 18,
    elevation: 12,
  },
};

export const vaccinesStyles = StyleSheet.create({
  // ───────────────────────────────────────────────────────────
  // Base
  // ───────────────────────────────────────────────────────────
  safeArea: {
    flex: 1,
    backgroundColor: colors.wine, // XML: background wine
  },

  // ───────────────────────────────────────────────────────────
  // Header (igual ao XML: wine_medium + back "‹")
  // ───────────────────────────────────────────────────────────
  header: {
    backgroundColor: colors.wineMedium,
    paddingHorizontal: SPACING.xl,
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  backButton: {
    paddingVertical: 6,
    paddingRight: 12,
  },

  backButtonText: {
    color: colors.cream,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0.2,
  },

  headerTitle: {
    color: colors.cream,
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: -0.1,
  },

  // ───────────────────────────────────────────────────────────
  // Alert (suave, estilo “aviso” do XML — sem agressividade)
  // ───────────────────────────────────────────────────────────
  alertSection: {
    marginTop: 14,
    marginHorizontal: 12,
    backgroundColor: "rgba(212, 98, 58, 0.16)", // terracotta suave
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: "rgba(212, 98, 58, 0.30)",
    padding: SPACING.lg,
  },

  alertTitle: {
    color: colors.cream,
    fontSize: 13.5,
    fontWeight: "900",
    marginBottom: 4,
  },

  alertDescription: {
    color: "rgba(245, 236, 215, 0.78)",
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: "700",
  },

  // ───────────────────────────────────────────────────────────
  // CTA (no XML o “+ Adicionar Vacina” é um hero button no fim;
  // aqui você já tem um botão: vamos dar cara de hero)
  // ───────────────────────────────────────────────────────────
  actionSection: {
    marginTop: 12,
    marginHorizontal: 12,
    marginBottom: 8,
  },

  addButton: {
    backgroundColor: colors.terracotta,
    borderRadius: RADIUS.card,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(192, 80, 32, 0.70)",
    ...SHADOWS.soft,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.2,
  },

  // ───────────────────────────────────────────────────────────
  // Seção / label (XML: “HISTÓRICO DE VACINAS” small caps, alpha)
  // ───────────────────────────────────────────────────────────
  section: {
    marginTop: 10,
    paddingBottom: 18,
  },

  sectionTitle: {
    marginLeft: 18,
    marginTop: 10,
    marginBottom: 8,
    color: "rgba(245, 236, 215, 0.55)",
    fontSize: 10.5,
    fontWeight: "900",
    letterSpacing: 1.0,
    textTransform: "uppercase",
  },

  // ───────────────────────────────────────────────────────────
  // Card/linha de vacina (XML: shape_card_wine + row + badge)
  // ───────────────────────────────────────────────────────────
  vaccineCard: {
    marginHorizontal: 12,
    marginBottom: 8,
    backgroundColor: colors.cardBg, // “shape_card_wine”
    borderRadius: RADIUS.card,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: "rgba(155, 46, 66, 0.45)",
    ...SHADOWS.soft,
  },

  vaccineCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  vaccineName: {
    color: colors.cream,
    fontSize: 13.5,
    fontWeight: "900",
    letterSpacing: -0.1,
  },

  // pill status (em vez de só texto “✓ Aplicada”, vira badge)
  vaccineStatus: {
    color: "#FFFFFF",
    fontSize: 10.5,
    fontWeight: "900",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    backgroundColor: "rgba(107, 203, 119, 0.90)", // green soft
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
    overflow: "hidden",
  },

  vaccineCardInfo: {
    gap: 6,
    marginBottom: 10,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  infoLabel: {
    color: "rgba(245, 236, 215, 0.65)",
    fontSize: 10.5,
    fontWeight: "900",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },

  infoValue: {
    color: "rgba(245, 236, 215, 0.92)",
    fontSize: 12,
    fontWeight: "800",
  },

  // botão editar (sutil, sem competir com o CTA)
  editButton: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(245, 236, 215, 0.12)",
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(245, 236, 215, 0.18)",
  },

  editButtonText: {
    color: colors.cream,
    fontSize: 12.5,
    fontWeight: "900",
    letterSpacing: 0.2,
  },

  // ───────────────────────────────────────────────────────────
  // Empty State
  // ───────────────────────────────────────────────────────────
  emptyState: {
    marginHorizontal: 12,
    backgroundColor: colors.cardBg,
    borderRadius: RADIUS.big,
    padding: 26,
    borderWidth: 1,
    borderColor: "rgba(155, 46, 66, 0.55)",
    alignItems: "center",
    ...SHADOWS.card,
  },

  emptyStateEmoji: {
    fontSize: 44,
    marginBottom: 10,
    opacity: 0.95,
  },

  emptyStateText: {
    color: colors.cream,
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 6,
    textAlign: "center",
  },

  emptyStateSubtext: {
    color: "rgba(245, 236, 215, 0.75)",
    fontSize: 13.5,
    lineHeight: 19,
    textAlign: "center",
    fontWeight: "700",
  },

  // ───────────────────────────────────────────────────────────
  // (Opcional) Styles do “CARD DO PET” do XML
  // Se você decidir renderizar esse bloco depois, já está pronto.
  // ───────────────────────────────────────────────────────────
  petCard: {
    marginHorizontal: 12,
    marginTop: 14,
    backgroundColor: colors.cream,
    borderRadius: RADIUS.card,
    borderWidth: 2,
    borderColor: colors.creamDark,
    padding: 16,
  },

  petHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  petIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.wineMedium,
    alignItems: "center",
    justifyContent: "center",
  },

  petIconEmoji: {
    fontSize: 26,
  },

  petTextCol: {
    marginLeft: 12,
    flex: 1,
  },

  petName: {
    color: colors.wineMedium,
    fontSize: 17,
    fontWeight: "900",
  },

  petMeta: {
    marginTop: 2,
    color: "rgba(74, 16, 32, 0.55)",
    fontSize: 11,
    fontWeight: "700",
  },

  petDivider: {
    height: 1,
    backgroundColor: colors.creamDark,
    marginBottom: 10,
  },

  petChipsRow: {
    flexDirection: "row",
    gap: 10,
  },

  petChip: {
    flex: 1,
    backgroundColor: colors.creamDark,
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "rgba(74, 16, 32, 0.06)",
  },

  petChipLabel: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.8,
    color: "rgba(74, 16, 32, 0.55)",
  },

  petChipValue: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "900",
    color: colors.wineMedium,
  },
});