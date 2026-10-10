<script setup>
import { ref } from 'vue'
import { socket } from '../useSocket'
import logo_img from '../assets/Logo.jpg'
import Logo from '../assets/Tenbin_Logo.svg'
import { useGame } from '../composables/useGame'
import { Snackbar } from '@varlet/ui'



const { isJoining } = useGame()

let name = ref("")

function join(){
    if(isJoining.value) return 
    if(!name.value.trim()) return Snackbar.info({
    content: "enter a username first",
    contentClass: 'black-snackbar',
    type: undefined
})
    try{
        console.log(`${name.value.trim()}`)
        socket.emit("join", name.value.trim())
    }
    catch(e){
        console.error(e)
    }
}
</script>

<template>
    <div style="position: absolute; display: flex; align-items: center; top:10px; left: 10px; height: clamp(20px,5%,40px);">
        <img height="200%" src="../assets/Tenbin_Logo.svg" alt="Logo" />
        <img height="100%" src="../assets/Tenbin.svg" alt="TENBIN" />
    </div>
    <div class="gameState">
        <div class="container">
            <h2 id="game_name">TenBin</h2>
            <img :src="Logo" style="background-color: black;" loading="lazy" id="logo_img" alt="logo_img">
            <input id="name_input" v-model="name" @keyup.enter="join()" type="text" placeholder="Enter username">
            <button id="play" class="submit blue" :disabled="isJoining" @click.prevent="join()">Play</button>
        </div>
    </div>
</template>