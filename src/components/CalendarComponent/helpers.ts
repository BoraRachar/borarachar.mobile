export const startOfDay = (d: Date) => { const nd = new Date(d); nd.setHours(0, 0, 0, 0); return nd; };
export const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
export const toISO = (d: Date) => d.toISOString().slice(0, 10);
export const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
export const clampDate = (d: Date, min?: Date, max?: Date) => {
    let x = d;
    if (min && x < min) x = min;
    if (max && x > max) x = max;
    return x;
};
export const isBeforeMonth = (a: Date, b: Date) => a.getFullYear() < b.getFullYear() || (a.getFullYear() === b.getFullYear() && a.getMonth() < b.getMonth());
export const isAfterMonth = (a: Date, b: Date) => a.getFullYear() > b.getFullYear() || (a.getFullYear() === b.getFullYear() && a.getMonth() > b.getMonth());

export const MONTHS_PT = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

export const weekLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];