<script setup>
import Login from './components/Login.vue'
import expLogin from './components/expLogin.vue'
import Lobby from './components/Lobby.vue'
import { Snackbar } from '@varlet/ui'
import { socket } from './useSocket'
import { useGame } from './composables/useGame'
import { onMounted, ref, watch } from 'vue'

const { isLoggedIn, isJoining, isDisabled, isRules } = useGame()
const isBlack = ref(false)

function bindSockets() {
  socket.on('lobby', (user) => {
    isLoggedIn.value = true
    socket.user_info = { ...user }
    if (user.isHost) {
      isDisabled.value = false
    }
    console.log(socket.user_info)
    console.log('lobby')
  })

  socket.on('host', () => {
    socket.user_info.isHost = true
    isDisabled.value = false
  })

  socket.on('disconnect', () => {
    Snackbar.error('Disconnected')
    console.log(socket.connected)
    isJoining.value = false
    isLoggedIn.value = false
  })

  socket.on('already_started', () => {
    Snackbar.error('Already Started!')
    isBlack.value = true
  })

  socket.on('room_full', () => {
    Snackbar.error('Room full!')
  })
}

socket.on('connect', () => {
  socket.removeAllListeners()
  bindSockets()
})

socket.on('disconnect', () => {
  socket.removeAllListeners()
  socket.on('connect', () => {
    socket.removeAllListeners()
    bindSockets()
  })
})
</script>

<template>
  <component :is="isLoggedIn && socket.connected ? Lobby : expLogin" />
</template>
