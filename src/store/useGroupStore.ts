import { create } from 'zustand';

interface GroupData {
  nome?: string;
  imgGrupo?: string;
  descricao?: string;
  descricaoCategoria?: string;
  idCategoria?: string;
  tipoDivisao?: number;
  participantes?: string[];
  nomeParticipantes?: string[];
}

interface GroupState {
  groupData: GroupData;
  setGroupData: (data: GroupData) => void;
  removeGroupData: () => void;
}

export const useGroupStore = create<GroupState>((set) => ({
  groupData: {},

  setGroupData: (data) => set((state) => ({
    groupData: { ...state.groupData, ...data }
  })),
  removeGroupData: () => set({ groupData: {} }),
}));