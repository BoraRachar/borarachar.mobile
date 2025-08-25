import React from 'react';
import { View, Text } from 'react-native';
import { weekLabels } from './helpers';
import { calendarStyles } from './styles';

export function WeekdayLabels() {
    return (
        <View style={calendarStyles.weekdaysContainer}>
            {weekLabels.map((lbl) => (
                <Text key={lbl} style={calendarStyles.weekdayLabel}>
                    {lbl}
                </Text>
            ))}
        </View>
    );
}