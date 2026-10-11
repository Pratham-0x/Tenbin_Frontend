import { ref } from 'vue'

const isLoggedIn = ref(false)
const isJoining = ref(false)
const isDisabled = ref(true)
const isRules = ref(false)


export function useGame() {
  return {
    isLoggedIn,
    isJoining,
    isDisabled,
    isRules,
  }
}
