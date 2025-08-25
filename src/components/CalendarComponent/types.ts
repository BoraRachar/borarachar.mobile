export type WeekStart = 0 | 1;

export type Props = {
    visible: boolean;
    onClose: () => void;

    onConfirm?: (date: Date | null) => void;
    onChange?: (date: Date | null) => void;

    value?: Date | null;
    defaultValue?: Date | null;

    autoSelectIfEmpty?: boolean;
    closeOnSelect?: boolean;

    minDate?: Date;
    maxDate?: Date;
    disableFuture?: boolean;

    weekStartsOn?: WeekStart;
    title?: string;

    confirmOnClear?: boolean;
};