import React from 'react';
import { View } from 'react-native';
import { DayCell } from './DayCell';
import { sameDay, startOfDay, toISO } from './helpers';
import { calendarStyles } from './styles';

export function DaysGrid({ cells, selected, isDisabledDay, onSelect }: {
    cells: (Date | null)[];
    selected: Date | null;
    isDisabledDay: (d: Date) => boolean;
    onSelect: (d: Date) => void;
}) {
    return (
        <View style={calendarStyles.daysGrid}>
            {cells.map((d, idx) => {
                if (!d) {
                    return <View key={`e-${idx}`} style={calendarStyles.emptyDayCell} />;
                }

                const disabled = isDisabledDay(d);
                const selectedDay = selected ? sameDay(startOfDay(d), startOfDay(selected)) : false;

                return (
                    <DayCell
                        key={toISO(d)}
                        date={startOfDay(d)}
                        isoKey={toISO(d)}
                        disabled={disabled}
                        selected={!!selectedDay}
                        onPress={onSelect}
                    />
                );
            })}
        </View>
    );
}