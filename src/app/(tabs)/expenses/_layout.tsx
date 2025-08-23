import { router, Stack } from 'expo-router'

import LeftIcon from '@/src/assets/images/arrowBack.svg'
import Question from '@/src/assets/images/question.svg'

export default function ExpensesLayout() {
    return (
        <Stack screenOptions={{
            headerShadowVisible: false
        }}>
            <Stack.Screen
                name="newExpense/index"
                options={{
                    title: 'Nova Despesa',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <LeftIcon
                            onPress={() => {
                                router.push('/home')
                            }}
                        />
                    ),
                    headerRight: () => <Question />,
                }}
            />
        </Stack>
    )
}
