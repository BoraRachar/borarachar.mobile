import { StyleSheet } from "react-native";
import { theme } from "@/src/theme";
import {
  verticalScale,
  horizontalScale,
  rem,
} from "@/src/utils/responsiveUtils";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(24),
  },
  containerDescription: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    fontFamily: theme.fontFamily.bold,
    fontSize: rem(24),
    lineHeight: 24,
    color: theme.colors.primaryColor,
    paddingVertical: verticalScale(12),
  },
  text: {
    fontFamily: theme.fontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.primaryColor,
  },
  textBold: {
    fontFamily: theme.fontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
    color: theme.colors.primaryColor,
  },
  containerList: {
    flex: 1,
    paddingVertical: verticalScale(12),
  },
  containerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.Gray[300],
  },
  itemContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  containerUser: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userIcon: {
    backgroundColor: theme.colors.third,
    borderRadius: 50,
    padding: 8,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    borderColor: theme.colors.primaryColor,
    borderWidth: 2,
    borderRadius: 4,
  },
  checkboxText: {
    fontFamily: theme.fontFamily.regular,
    fontSize: 16,
    color: theme.colors.primaryColor,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  nextButton: {
    flex: 1,
    height: 48,
    backgroundColor: theme.colors.Gray[600],
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.white,
    fontFamily: theme.fontFamily.semiBold,
  },
  backButton: {
    flex: 1,
    height: 48,
    backgroundColor: theme.colors.secondaryColor,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.primaryColor,
    fontFamily: theme.fontFamily.semiBold,
  },
  disabledButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    backgroundColor: theme.colors.fourth,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
