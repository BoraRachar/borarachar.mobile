import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { calendarStyles } from './styles';
import { theme } from '@/src/theme';

export function CalendarNav({ monthLabel, canGoPrev, canGoNext, onPrev, onNext }: {
    monthLabel: string;
    canGoPrev: boolean;
    canGoNext: boolean;
    onPrev: () => void;
    onNext: () => void;
}) {
    return (
        <View style={calendarStyles.navContainer}>
            <TouchableOpacity
                onPress={onPrev}
                disabled={!canGoPrev}
                style={[
                    calendarStyles.navButton,
                    { backgroundColor: theme.colors.white, opacity: canGoPrev ? 1 : 0.4 }
                ]}
            >
                <Ionicons name="chevron-back" size={16} color={theme.colors.Gray[700]} />
            </TouchableOpacity>

            <Text style={[calendarStyles.navMonthText, { color: theme.colors.Gray[700] }]}>
                {monthLabel}
            </Text>

            <TouchableOpacity
                onPress={onNext}
                disabled={!canGoNext}
                style={[
                    calendarStyles.navButton,
                    { backgroundColor: theme.colors.white, opacity: canGoNext ? 1 : 0.4 }
                ]}
            >
                <Ionicons name="chevron-forward" size={16} color={theme.colors.Gray[700]} />
            </TouchableOpacity>
        </View>
    );
}