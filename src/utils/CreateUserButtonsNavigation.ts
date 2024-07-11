import { useStepStore } from '@/src/store/StepStore'

export function useNavigationControls() {
  const { step, increaseStep } = useStepStore()

  function handleNavigationButton() {
    if (step >= 1 && step < 6) {
      increaseStep()
    }
  }

  return { handleNavigationButton }
}
