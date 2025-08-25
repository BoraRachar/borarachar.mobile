import React, { useEffect, useMemo, useState } from 'react';
import { Modal, View } from 'react-native';
import { CalendarHeader } from './CalendarHeader';
import { CalendarNav } from './CalendarNav';
import { WeekdayLabels } from './WeekdayLabels';
import { DaysGrid } from './DaysGrid';
import { FooterButtons } from './FooterButtons';
import { MONTHS_PT, clampDate, isAfterMonth, isBeforeMonth, startOfDay, startOfMonth } from './helpers';
import { calendarStyles } from './styles';
import { theme } from '@/src/theme';
import type { Props } from './types';

export default function CalendarComponent(props: Props) {
    const {
        visible,
        onClose,
        onConfirm,
        onChange,
        value,
        defaultValue = null,
        autoSelectIfEmpty = true,
        closeOnSelect = false,
        minDate,
        maxDate,
        disableFuture = false,
        weekStartsOn = 1,
        title = 'Selecionar data',
        confirmOnClear = true,
    } = props;

    const today = useMemo(() => startOfDay(new Date()), []);
    const isControlled = value !== undefined;

    const minAllowed = minDate ? startOfDay(minDate) : undefined;
    const maxAllowed = disableFuture ? today : (maxDate ? startOfDay(maxDate) : undefined);

    const [internalDate, setInternalDate] = useState<Date | null>(defaultValue);
    const selected = isControlled ? (value ?? null) : internalDate;

    const [visibleMonth, setVisibleMonth] = useState<Date>(startOfMonth(today));

    useEffect(() => {
        if (!visible) return;

        let base: Date | null = (isControlled ? value ?? null : internalDate ?? defaultValue ?? null);
        if (!base && autoSelectIfEmpty) base = today;

        if (base) {
            const clamped = clampDate(startOfDay(base), minAllowed, maxAllowed);
            if (!isControlled) { setInternalDate(clamped); onChange?.(clamped); }
            setVisibleMonth(startOfMonth(clamped));
        } else {
            const anchor = clampDate(today, minAllowed, maxAllowed);
            setVisibleMonth(startOfMonth(anchor));
            if (!isControlled) onChange?.(null);
        }
    }, [visible]);

    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();

    const first = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const firstDayJs = first.getDay();
    const offset = weekStartsOn === 1 ? (firstDayJs + 6) % 7 : firstDayJs;

    const cells: (Date | null)[] = [];
    for (let i = 0; i < offset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

    const prevMonth = startOfMonth(new Date(year, month - 1, 1));
    const nextMonth = startOfMonth(new Date(year, month + 1, 1));
    const canGoPrev = !minAllowed || !isBeforeMonth(prevMonth, startOfMonth(minAllowed));
    const canGoNext = !maxAllowed || !isAfterMonth(nextMonth, startOfMonth(maxAllowed));

    const onPrev = () => { if (canGoPrev) setVisibleMonth(prevMonth); };
    const onNext = () => { if (canGoNext) setVisibleMonth(nextMonth); };

    const isDisabledDay = (d: Date) => {
        if (minAllowed && d < minAllowed) return true;
        if (maxAllowed && d > maxAllowed) return true;
        return false;
    };

    const handleSelect = (d: Date) => {
        if (isDisabledDay(d)) return;
        if (isControlled) onChange?.(d);
        else { setInternalDate(d); onChange?.(d); }
        setVisibleMonth(startOfMonth(d));
        if (closeOnSelect) { onConfirm?.(d); onClose(); }
    };

    const handleClear = () => {
        if (isControlled) onChange?.(null);
        else { setInternalDate(null); onChange?.(null); }
        if (confirmOnClear) onConfirm?.(null);
    };

    const handleApply = () => {
        if (!selected) return;
        onConfirm?.(selected);
        onClose();
    };

    const canApply = !!selected;
    const monthLabel = `${MONTHS_PT[month]} ${year}`;

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={[calendarStyles.overlay, { backgroundColor: theme.colors.Gray[900] + '73' }]}>
                <View style={[calendarStyles.modalSheet, { backgroundColor: theme.colors.white }]}>
                    <CalendarHeader title={title} onClose={onClose} />
                    <View style={[calendarStyles.calendarCard, { borderColor: theme.colors.Gray[200], backgroundColor: theme.colors.white }]}>
                        <CalendarNav
                            monthLabel={monthLabel}
                            canGoPrev={canGoPrev}
                            canGoNext={canGoNext}
                            onPrev={onPrev}
                            onNext={onNext}
                        />

                        <WeekdayLabels />

                        <DaysGrid
                            cells={cells}
                            selected={selected ?? null}
                            isDisabledDay={isDisabledDay}
                            onSelect={handleSelect}
                        />

                        <FooterButtons onClear={handleClear} onApply={handleApply} canApply={canApply} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}