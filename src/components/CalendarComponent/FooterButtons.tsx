import React from 'react';
import { View } from 'react-native';
import { ButtonCustomizer } from '../ButtonCustomizer';
import { calendarStyles } from './styles';
import { theme } from '@/src/theme';

export function FooterButtons({ onClear, onApply, canApply }: {
    onClear: () => void;
    onApply: () => void;
    canApply: boolean;
}) {
    return (
        <View style={calendarStyles.footerButtons}>
            <ButtonCustomizer.Root type="tertiaryHalfWidth" onPress={onClear} customStyles={{
                backgroundColor: theme.colors.third,
                borderWidth: 0,
            }}>
                <ButtonCustomizer.Title
                    title="Limpar"
                    customStyles={calendarStyles.secondaryButtonText}
                />
            </ButtonCustomizer.Root>

            <ButtonCustomizer.Root
                type="primaryHalfWidth"
                onPress={onApply}
                disabled={!canApply}
                customStyles={{
                    borderWidth: 0,
                    backgroundColor: canApply ? theme.colors.primaryColor : theme.colors.fourth,
                }}
            >
                <ButtonCustomizer.Title
                    title="Aplicar"
                    customStyles={calendarStyles.primaryButtonText}
                />
            </ButtonCustomizer.Root>
        </View>
    );
}