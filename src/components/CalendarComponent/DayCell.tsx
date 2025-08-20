import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { calendarStyles } from './styles';
import { theme } from '@/src/theme';

export function DayCell({ date, isoKey, disabled, selected, onPress }: {
    date: Date;
    isoKey: string;
    disabled: boolean;
    selected: boolean;
    onPress: (d: Date) => void;
}) {
    return (
        <TouchableOpacity
            key={isoKey}
            onPress={() => onPress(date)}
            disabled={disabled}
            activeOpacity={0.7}
            style={calendarStyles.dayCell}
        >
            <View style={[
                calendarStyles.dayButton,
                { backgroundColor: selected ? theme.colors.Gray[600] : 'transparent' }
            ]}>
                <Text style={[
                    calendarStyles.dayText,
                    selected && calendarStyles.dayTextSelected,
                    {
                        color: selected ? theme.colors.white : (disabled ? theme.colors.Gray[400] : theme.colors.Gray[700])
                    }
                ]}>
                    {date.getDate()}
                </Text>
            </View>
        </TouchableOpacity>
    );
}