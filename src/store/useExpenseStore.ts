import { create } from "zustand";

interface ExpenseData {
  expenseName?: string;
  description?: string;
  selectedDate?: Date | null;
  value?: number;
  grupoId?: string;
  userCod?: string | null;
  recebedores?: string[];
}

interface ExpenseState {
  expenseData: ExpenseData;
  setExpenseData: (data: ExpenseData) => void;
  removeExpenseData: () => void;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  expenseData: {},

  setExpenseData: (data) =>
    set((state) => ({
      expenseData: { ...state.expenseData, ...data },
    })),
  removeExpenseData: () => set({ expenseData: {} }),
}));
