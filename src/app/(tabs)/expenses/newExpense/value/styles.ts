import { StyleSheet } from 'react-native'
import { theme } from '@/src/theme'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 24,
        gap: 24,
    },
    label: {
        fontWeight: '700',
        fontSize: 24,
        fontFamily: theme.fontFamily.bold,
        color: theme.colors.primaryColor,
    },
    valueInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.Gray[300],
        borderRadius: 8,
        paddingHorizontal: 16,
        height: 48,
        backgroundColor: theme.colors.white,
    },
    valueInput: {
        flex: 1,
        fontSize: 16,
        fontWeight: '400',
        fontFamily: theme.fontFamily.medium,
        color: theme.colors.Gray[900],
        textAlign: 'left',
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
