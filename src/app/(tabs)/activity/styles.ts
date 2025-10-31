import { StyleSheet } from "react-native";
import { theme } from "@/src/theme";

import {
  horizontalScale,
  rem,
  verticalScale,
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
  },
  input: {
    color: theme.colors.secondaryColor,
  },
  containerActivity: {
    flex: 1,
    gap: verticalScale(12),
  },
  textNoActivity: {
    fontFamily: theme.fontFamily.regular,
    fontSize: rem(16),
    lineHeight: verticalScale(24),
    paddingVertical: verticalScale(12),
    color: theme.colors.primaryColor,
  },
  dateContainer: {
    backgroundColor: theme.colors.Gray[100],
    borderRadius: 12,
    paddingHorizontal: horizontalScale(12),
    alignSelf: "center",
  },
  dateTitle: {
    textAlign: "center",
    fontFamily: theme.fontFamily.semiBold,
    fontSize: rem(16),
    lineHeight: 24,
    color: theme.colors.Gray[500],
    paddingVertical: verticalScale(12),
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  activityDesc: {
    color: theme.colors.primaryColor,
    fontSize: 15,
    fontWeight: "600",
  },
  activityGroup: {
    color: "#AAA",
    fontSize: 13,
  },
  activityValue: {
    color: theme.colors.Success[500],
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
  },

  //   containerButton: {
  //     flexDirection: "row",
  //     justifyContent: "space-between",
  //     alignItems: "center",
  //     paddingVertical: verticalScale(12),
  //     borderBottomWidth: 1,
  //     borderBottomColor: theme.colors.Gray[300],
  //   },
  //   text: {
  //     fontFamily: theme.fontFamily.semiBold,
  //     fontSize: rem(16),
  //     lineHeight: verticalScale(24),
  //     color: theme.colors.primaryColor,
  //   },
  //   textLight: {
  //     fontFamily: theme.fontFamily.regular,
  //   },
  //   addButton: {
  //     backgroundColor: theme.colors.third,
  //     borderRadius: 50,
  //     padding: 14,
  //   },
  //   containerGroup: {
  //     flexDirection: "row",
  //     justifyContent: "space-between",
  //     alignItems: "center",
  //     paddingVertical: verticalScale(12),
  //     borderBottomWidth: 1,
  //     borderBottomColor: theme.colors.Gray[300],
  //   },
  //   containerImage: {
  //     backgroundColor: theme.colors.third,
  //     borderRadius: 50,
  //     padding: 8,
  //     width: 48,
  //     height: 48,
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  //   emptyGroup: {
  //     textAlign: "center",
  //     paddingVertical: verticalScale(40),
  //   },
});
