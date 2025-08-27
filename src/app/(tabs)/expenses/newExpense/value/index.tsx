import { Text, View, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { router } from 'expo-router'
import * as yup from 'yup'

import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'
import { useExpenseStore } from '@/src/store/useExpenseStore'
import { theme } from '@/src/theme'
import { styles } from './styles'
import ProgressBarComponent from '@/src/components/ProgressBarComponent'

type FormData = {
    valueDigits: string
}

const MAX_DIGITS = 11

const numberToDigits = (number?: number) =>
    typeof number === 'number' && isFinite(number) ? Math.round(number * 100).toString() : ''

const digitsToNumber = (digits: string) => (Number(digits) || 0) / 100

const schema = yup.object({
    valueDigits: yup
        .string()
        .required('Valor é obrigatório')
        .test('gt-zero', 'Valor deve ser maior que zero', (value) => !!value && Number(value) > 0)
})

const formatCurrency = (digits: string) => {
    if (!digits) return 'R$ 0,00'
    const number = Number(digits) / 100
    return `R$ ${number.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`
}

export default function ExpenseValue() {
    const { expenseData, setExpenseData } = useExpenseStore()

    const {
        control,
        handleSubmit,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            valueDigits: numberToDigits(expenseData.value),
        },
        mode: 'onChange',
    })

    const digits = useWatch({ control, name: 'valueDigits' }) || ''
    const canProceed = Number(digits) > 0

    const handleNext = (data: FormData) => {
        const numValue = digitsToNumber(data.valueDigits)
        setExpenseData({ ...expenseData, value: numValue })
        console.log('Expense Data Updated:', { ...expenseData, value: numValue })
        // vá para a próxima etapa se quiser
        router.push('/expenses/newExpense/group')
    }

    return (
        <KeyboardAvoidingView style={styles.container} >
            <ProgressBarComponent totalSteps={100} currentStep={50} />

            <View style={styles.formContainer}>
                <Text style={styles.label}>Qual o valor dessa despesa?</Text>

                <View style={styles.valueInputContainer}>
                    <Controller
                        control={control}
                        name="valueDigits"
                        render={({ field: { value, onChange, onBlur } }) => (
                            <TextInput
                                style={styles.valueInput}
                                value={value ? formatCurrency(value) : ''}
                                onChangeText={(text) => {
                                    const onlyDigits = text.replace(/\D/g, '').slice(0, MAX_DIGITS)
                                    onChange(onlyDigits)
                                }}
                                onBlur={onBlur}
                                placeholder="R$ 0,00"
                                placeholderTextColor={theme.colors.fourth}
                                keyboardType="number-pad"
                                returnKeyType="done"
                            />
                        )}
                    />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <ButtonCustomizer.Root
                    type="primary"
                    onPress={handleSubmit(handleNext)}
                    disabled={!canProceed}
                    customStyles={!canProceed ? [styles.nextButton, styles.disabledButton] : styles.nextButton}
                >
                    <ButtonCustomizer.Title title="Grupo" customStyles={styles.nextButtonText} />
                    <Ionicons name="arrow-forward" size={20} color={theme.colors.white} style={{ marginLeft: 8 }} />
                </ButtonCustomizer.Root>
            </View>
        </KeyboardAvoidingView>
    )
}