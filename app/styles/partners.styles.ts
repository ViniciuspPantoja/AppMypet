import { StyleSheet } from "react-native";

export const partnersStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7efe4",
  },
  content: {
    padding: 20,
    paddingBottom: 36,
  },
  header: {
    marginBottom: 18,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: "rgba(91, 33, 50, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  backButtonText: {
    fontSize: 22,
    color: "#5b2132",
    fontWeight: "700",
    includeFontPadding: false,
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 22,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#2a1f24",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: "#5e4f55",
  },
  heroCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 24,
    padding: 18,
    backgroundColor: "#5b2132",
    marginBottom: 18,
  },
  heroEmoji: {
    fontSize: 34,
  },
  heroTextBlock: {
    flex: 1,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
  },
  heroDescription: {
    color: "rgba(255,255,255,0.82)",
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#2a1f24",
  },
  sectionCount: {
    color: "#7d6e73",
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 16,
    marginBottom: 14,
    borderLeftWidth: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  logoBubble: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 28,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "900",
    color: "#2a1f24",
  },
  cardCategory: {
    marginTop: 4,
    color: "#b46a3c",
    fontWeight: "800",
  },
  cardSummary: {
    color: "#4c4347",
    lineHeight: 21,
    marginBottom: 14,
  },
  metaRow: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f1e6dc",
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#8a7a80",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metaValue: {
    color: "#2a1f24",
    fontWeight: "700",
  },
  cardActions: {
    gap: 8,
    marginTop: 6,
  },
  siteButton: {
    alignSelf: "flex-start",
    minHeight: 46,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: "#5b2132",
    alignItems: "center",
    justifyContent: "center",
  },
  siteButtonText: {
    color: "#fff",
    fontWeight: "900",
    textAlign: "center",
  },
  siteHint: {
    color: "#8a7a80",
    fontSize: 12,
  },
  footerNote: {
    marginTop: 10,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "rgba(91, 33, 50, 0.06)",
  },
  footerNoteText: {
    color: "#5e4f55",
    lineHeight: 20,
  },
});
