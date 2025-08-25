import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { calendarStyles } from './styles';
import { theme } from '@/src/theme';

export function CalendarHeader({ title, onClose }: {
    title: string;
    onClose: () => void;
}) {
    return (
        <View style={calendarStyles.headerContainer}>
            <Text style={[calendarStyles.headerTitle, { color: theme.colors.Gray[700] }]}>{title}</Text>
            <TouchableOpacity
                onPress={onClose}
                style={calendarStyles.closeButton}
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                accessibilityLabel="Fechar"
            >
                <Ionicons name="close" size={20} color={theme.colors.Gray[700]} />
            </TouchableOpacity>
        </View>
    );
}