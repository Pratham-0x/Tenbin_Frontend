<script setup>
import {ref} from 'vue'
import { socket } from '../useSocket.js'
const value = ref(null)
import { useGame } from '../composables/useGame'

const { picked, showPick } = useGame()

function submitPick(){
    showPick.value = false
    picked.value = true
    if (value.value<0 || value.value>100) return
    socket.emit("picked", value.value)
    console.info(value.value)
    value.value = null
    picked.value = false
}

socket.on("submitted", ()=>{
    showPick.value = false
})

</script>
<template>
        <var-popup :close-on-click-overlay="false" :close-on-key-escape="false" v-model:show="showPick" position="center">
        <div style="padding: 20px 24px; background-color: black; color: white; border: 1px solid grey; text-align: center; width: 250px; ">
            <div style="font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">Pick number 0-100</div>
            <var-counter style="background-image: linear-gradient(90deg, black, black, black, black, black)" v-model="value" @keyup.enter.once="submitPick()" type="number" min="0" max="100" />
            <var-button @click="submitPick()" text-color="white" style="background-image: linear-gradient(45deg, black, rgb(37, 27, 27), rgb(0, 0, 0)); filter: drop-shadow(1px 1px 1px grey);">pick</var-button>
        </div>
    </var-popup>
</template>