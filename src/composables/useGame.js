import { ref } from 'vue'

const isLoggedIn = ref(false)
const isJoining = ref(false)
const isDisabled = ref(true)
const isRules = ref(false)
const picked = ref(false)
const showPick = ref(false)
const round_record = ref([])

export function useGame() {
  return {
    isLoggedIn,
    isJoining,
    isDisabled,
    isRules,
    picked,
    showPick,
    round_record
  }
}
