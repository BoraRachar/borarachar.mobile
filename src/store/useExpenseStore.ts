import { create } from "zustand";

export interface ExpenseData {
  nome?: string;
  descricao?: string;
  dataRealizacao?: Date | null;
  valorDespesa?: number;
  idGrupo?: string;
  nomeGrupo?: string;
  userCod?: string | null;
  recebedores?: string[];
  recebedoresNome?: string[];
  pagadores?: string[];
  pagadoresNome?: string[];
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
