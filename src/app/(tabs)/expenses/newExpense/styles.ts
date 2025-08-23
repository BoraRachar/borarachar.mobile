import { StyleSheet } from 'react-native'
import { theme } from '@/src/theme'

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 24,
        gap: 24,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.primaryColor,
        fontFamily: theme.fontFamily.semiBold,
    },
    textInput: {
        height: 48,
        borderWidth: 1,
        borderColor: theme.colors.Gray[300],
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: theme.colors.white,
    },
    textArea: {
        height: 134,
        borderWidth: 1,
        borderColor: theme.colors.Gray[300],
        borderRadius: 6,
        paddingHorizontal: 16,
        paddingTop: 12,
        fontSize: 16,
        backgroundColor: theme.colors.white,
    },
    inputError: {
        borderColor: theme.colors.Error[500],
    },
    helperText: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: theme.fontFamily.regular,
        color: theme.colors.Gray[500],
    },
    errorText: {
        fontSize: 12,
        color: theme.colors.Error[500],
    },
    dateInput: {
        height: 48,
        borderWidth: 1,
        borderColor: theme.colors.Gray[300],
        borderRadius: 6,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.white,
    },
    dateText: {
        fontSize: 16,
        color: theme.colors.primaryColor,
        fontWeight: '400',
        fontFamily: theme.fontFamily.regular,
    },
    helperDateText: {
        fontSize: 16,
        color: theme.colors.fourth,
        fontWeight: '400',
        fontFamily: theme.fontFamily.regular,
    },
    buttonContainer: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        gap: 16,
        flexDirection: 'row',
    },
    nextButton: {
        flex: 1,
        height: 48,
        backgroundColor: theme.colors.Gray[600],
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    disabledButton: {
        backgroundColor: theme.colors.fourth,
    },
    nextButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.white,
        fontFamily: theme.fontFamily.semiBold,
    },
})
