<script setup>
import { size, toArray } from 'lodash';
import { onMounted, onUnmounted, ref } from 'vue';

let active = ref(0)
let inter = ref(null)

const props = defineProps(['winner'])

const chars = toArray(props.winner)
onMounted(()=>{
    inter.value = setInterval(()=>{
        console.log(size(props.winner))
        active.value = ((active.value+1)%size(props.winner))
        console.log(active.value)
    }, 200)
})

onUnmounted(()=>{
    clearInterval(inter.value)
})
</script>

<template>
    <div
        style="position: absolute; display: flex; justify-content: center; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.4);">
        <div id="winner_plate" style="align-self: center;">
            <span  >Winner</span>
            <br>
            is
            <br>
            <!-- {{winner}} -->
            <span v-for="(char, i) in chars" :key="i" class="letter" :class="{'animation': i === active}" >
                {{ char }}
            </span>
        </div>
    </div>
</template>

<style scoped>
#winner_plate {
    position: relative;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    animation: opacityy 0.3s infinite, entry 0.4s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
}

@keyframes opacityy {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes entry {
    0% {
        visibility: hidden;
    }

    100% {
        visibility: visible;
        transform: translateX(-60px);
        transform: scale(3);
    }
}

.letter {
    color: rgb(255, 255, 255);
    transform: scale(1);
    filter: drop-shadow(1px 1px 0px rgb(255, 255, 255));
    /* font-family: fantasy; */
    
    display: inline-block;
}
.animation{
    color: rgb(0, 0, 0);
    transform: scale(1.1);
}
</style>