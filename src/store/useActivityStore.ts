import { create } from "zustand";

export const useActivityStore = create((set) => ({
  expenseData: {},

  setExpenseData: (data: any) =>
    set((state: { expenseData: any }) => ({
      expenseData: { ...state.expenseData, ...data },
    })),
  removeExpenseData: () => set({ expenseData: {} }),
}));
