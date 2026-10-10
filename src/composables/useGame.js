import { ref } from 'vue'

export function useGame() {
  const isLoggedIn = ref(false)
  const isJoining = ref(false)
  const isDisabled = ref(true)
  const isRules = ref(false)

  return {
    isLoggedIn,
    isJoining,
    isDisabled,
    isRules,
  }
}
