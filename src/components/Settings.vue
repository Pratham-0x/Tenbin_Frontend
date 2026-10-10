<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { socket } from '../useSocket'
import {useGame} from '../composables/useGame'

const { isDisabled } = useGame()
const selected = ref('30')

onMounted(()=>{
    socket.on("time_picked", (v)=>{selected.value=v})
})

onUnmounted(()=>{
    socket.off("time_picked")
})

const picked = ()=>{
    socket.emit("pick_time", selected.value)
}

</script>

<template>
        Pick Time: <select v-model="selected" @change="picked" name="pickTime" id="pickTime" :disabled="isDisabled">              
                <option value="30" selected>30</option>
                <option value="60">60</option>
                <option value="90">90</option>
                <option value="120">120</option>
        </select> seconds

</template>

<style scoped>
    select{
        outline: none;
        border: none;
    }
</style>