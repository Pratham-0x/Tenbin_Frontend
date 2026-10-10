<script setup>
import lamp from '../assets/Wall_Lamp.png'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { socket } from '../useSocket'
import logo_img from '../assets/Logo.jpg'
import logo from '../assets/Tenbin_Logo.svg'
import textSound from '../assets/sfx/lightOnnn.mp3'
import lightSound from '../assets/sfx/lightOn.wav'
import Logo from './Logo.vue'
import { useGame } from '../composables/useGame'
import { Snackbar } from '@varlet/ui'
import Rules from './Rules.vue'



const { isJoining } = useGame()
const isBlack = ref(false)
const isLamp = ref(false)
const sound = new Audio(lightSound)
const text = new Audio(textSound)

let name = ref("")

const input_sound = () => {
    text.currentTime = 0.18
    text.volume = 0.3
    text.play()
}


const input_handler = ()=>{
    if (name.value.length > 12) return name.value = name.value.slice(0, (name.value.length-1))
    if (name.value[(name.value.length-1)] == " ") name.value = name.value.trim()+"_"
    input_sound()
}

onMounted(() => {
    socket.on("already_started", () => {
        isBlack.value = false
        Snackbar.error("Already Started!")
    })
})

onUnmounted(() => {
    socket.off("already_started")
})

function join() {
    if (isJoining.value) return
    if (!name.value.trim()) return Snackbar.info({
        content: "enter a username first",
        contentClass: 'black-snackbar',
        type: undefined
    })
    try {
        if (!socket.connected) return
        console.log(`${name.value.trim()}`)
        isBlack.value = true
        setTimeout(() => {
            socket.emit("join", name.value.trim())
        }, 2000)
    }
    catch (e) {
        console.error(e)
    }
}

function lightOn() {
    sound.currentTime = 0
    sound.volume = 1
    sound.play()
    isLamp.value = true
}
function lightOff() {
    isLamp.value = false
}

</script>

<template>
    <Logo />
    <Rules />
    <div class="sh" :class="{ black: isBlack }">

    </div>
    <div class="scene" :class="{ black: isBlack }">
        <div class="bg-wall">
            <img src="../assets/full_wall.png" class="bg-wall1" alt="" srcset="">
            <div class="bg-wall2">
                <img src="../assets/crack.png" style="right: 0; position: absolute;" width="80" alt=""
                    srcset="">
            </div>
        </div>
    </div>



    <div class=" gameState scene" :class="{ lit: isLamp, black: isBlack }">
        <div class="lamp-wrapper">
            <img :src="lamp" width="80" alt="Lamp" class="lamp-img" />
            <div class="light-cone"></div>
        </div>
        <div class="container">
            <h2 id="game_name">TenBin</h2>
            <img :src="logo" style="background-color: black;" loading="lazy" id="logo_img" alt="logo_img">
            <input id="name_input" v-model="name" @input="input_handler" @keyup.enter="join()" @focusin="lightOn"
                @focusout="lightOff" type="text" placeholder="Enter username">
            <button id="play" class="submit blue" :disabled="isJoining" @click.prevent="join()">Play</button>
        </div>
    </div>
</template>

<style scoped>
/* REMOVE this */

.sh {
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    background-image: url(/src/assets/cracks1.png);
    width: 100dvw;
    height: 100dvh;
    background-repeat: repeat;
    background-size: contain;
    background-color: rgb(0, 0, 0);

}

/* ADD a wrapper in template */
.scene {
    perspective: 400px;
    perspective-origin: 0% 70%;
    position: absolute;
    inset: 0;
    overflow: hidden;

}

.bg-wall {
    display: block;
    position: relative;
    perspective: 400px;
    perspective-origin: 0% 50%;
    /* top: 0;
    left: 0; */
    width: 100dvw;
    height: 100dvh;
    transform: perspective(400px) rotateY(3deg);
    transform-origin: left center;
    filter: brightness(0.9);
}

.bg-wall1 {
    display: block;
    position: inherit;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}


.bg-wall2 {
    transform: rotateY(-290deg);
    transform-origin: right center;
    background-image: url(../assets/rough_wall.png);
    background-blend-mode: hue;
    background-repeat: repeat;
    background-color: rgba(33, 50, 3, 0.504);
    background-size: contain;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: brightness(0.1);
}

.lamp-img {
    position: relative;
    left: 0;
    margin-bottom: 20px;
    z-index: 2;
    transform: scaleZ(50);
    transform-style: preserve-3d;
    transition: filter 0.2s ease;
    filter: brightness(0.3);
}


.container {
    position: relative;
    z-index: 1;
    transition: box-shadow 0.2s ease;
    border-radius: 12px;
    padding: 20px;
    transition: filter 0.2s ease;
    filter: brightness(0.3);
}


.gameState.lit .lamp-img {
    filter: brightness(0.3) drop-shadow(0 0 50px rgba(255, 200, 90, 0.237)) drop-shadow(0 0 45px rgba(255, 180, 60, 0));
}


.gameState.lit .container {
    /* box-shadow: 0 0 30px rgba(255, 210, 110, 0.25), 0 0 80px rgba(255, 190, 80, 0.12); */
    filter: brightness(1);
}


.gameState {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    gap: 25px;
    position: relative;
    flex-direction: column;
    align-items: center;
    transform: perspective(40px) rotateY(1deg);
    transform-origin: left center;
}


.lamp-wrapper {
    position: relative;
    z-index: 50;
    width: 80px;
    height: 80px;
}

.lamp-img {
    transform: scaleZ(5);
    width: 80px;
    display: block;
    position: relative;
    z-index: 2;
}

.light-cone {
    position: absolute;

    top: 100%;
    left: 50%;

    width: 280px;
    height: 400px;

    transform: translateX(-50%);

    background: radial-gradient(ellipse at top,
            rgba(255, 220, 130, 0.25),
            transparent 70%);

    clip-path: polygon(42% 0,
            58% 0,
            550% 100%,
            -420% 100%);

    opacity: 0;
    transition: opacity 0.2s ease;

    pointer-events: none;
    z-index: 1;
}

.gameState.lit .light-cone {
    opacity: 1;
    z-index: 99;
    filter: brightness(1);
}

.black {
    transition: all ease-in 0.2s;
    filter: brightness(0);
}
</style>
