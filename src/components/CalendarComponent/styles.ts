import { StyleSheet } from 'react-native';
import { theme } from '@/src/theme';

export const calendarStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalSheet: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        paddingBottom: 24,
        elevation: 8,
    },
    headerContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
        minHeight: 22,
    },
    headerTitle: {
        fontSize: 16,
        fontFamily: theme.fontFamily.semiBold,
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        top: -2,
        padding: 4,
    },
    calendarCard: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 8,
    },
    navContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    navButton: {
        padding: 10,
    },
    navMonthText: {
        fontSize: 18,
        fontFamily: theme.fontFamily.semiBold,
    },
    weekdaysContainer: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    weekdayLabel: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        fontFamily: theme.fontFamily.regular,
        color: theme.colors.Gray[500],
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 75,
    },
    dayCell: {
        width: '14.285%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyDayCell: {
        width: '14.285%',
        height: 40,
    },
    dayButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayText: {
        fontSize: 16,
        fontFamily: theme.fontFamily.medium,
    },
    dayTextSelected: {
        fontFamily: theme.fontFamily.bold,
    },
    footerButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    secondaryButtonText: {
        fontSize: theme.sizes.fontSize16,
        lineHeight: 24,
        fontWeight: 'bold',
        color: theme.colors.Gray[700],
    },
    primaryButtonText: {
        fontSize: theme.sizes.fontSize16,
        lineHeight: 24,
        fontWeight: 'bold',
        paddingRight: 8,
        color: theme.colors.white,
    },
});

