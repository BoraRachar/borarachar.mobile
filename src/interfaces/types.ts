interface Step {
  step: number
  increaseStep: () => void
  decreaseStep: () => void
}

interface UserData {
  nome: string
  email: string
  usuario: string
  password: string
  termosUso: boolean
  politicasPrivacidade: boolean
}

export { Step, UserData }
