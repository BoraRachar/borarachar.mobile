import { create } from 'zustand'

interface Props {
  pendingInvitations: {
    aceite: boolean
    amigoId: string
    nome: string
    imgUser: string
  }[]
  emailInvitations: {
    idConvite: string
    nome: string
  }[]

  addPendingInvitations: (pendingInvitations: []) => void
  addEmailInvitations: (emailInvitations: []) => void
}

export const useFriendStore = create<Props>((set) => ({
  pendingInvitations: [],
  emailInvitations: [],

  addPendingInvitations: (pendingInvitations) => set({ pendingInvitations }),
  addEmailInvitations: (emailInvitations) => set({ emailInvitations }),
}))
