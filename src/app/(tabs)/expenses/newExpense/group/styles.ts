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
  title: {
    fontFamily: theme.fontFamily.bold,
    fontSize: rem(24),
    lineHeight: 24,
    color: theme.colors.primaryColor,
    paddingVertical: verticalScale(12),
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.Gray[300],
    gap: 8,
  },
  text: {
    fontFamily: theme.fontFamily.semiBold,
    fontSize: 18,
    lineHeight: 24,
    color: theme.colors.primaryColor,
  },
  addButton: {
    backgroundColor: theme.colors.third,
    borderRadius: 50,
    padding: 14,
  },
  containerList: {
    flex: 1,
    paddingVertical: verticalScale(12),
  },
  containerGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.Gray[300],
  },
  containerImage: {
    backgroundColor: theme.colors.third,
    borderRadius: 50,
    padding: 8,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  groupIcon: {
    borderBlockColor: theme.colors.primaryColor,
  },
  containerDescription: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  textLight: {
    fontFamily: theme.fontFamily.regular,
  },
  textUnselected: {
    color: theme.colors.secondaryColor,
  },
  containerBottomButton: {
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
