<script setup>
import { socket } from '../useSocket'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import PickNum from './pickNum.vue'
import '../lobby.css'
import { isNumber } from 'lodash'
import { useGame } from '../composables/useGame'
import Settings from './Settings.vue'
import winner from './winner.vue'
import Dashboard from './Dashboard.vue'
import AllDied from './AllDied.vue'
import TvOverlay from './TvOverlay.vue'
const { picked, isLoggedIn, isDisabled, showPick, round_record } = useGame()

const players = ref([])
const timeLeft = ref(null)
const round = ref(null)
const state = ref(null)
const text = ref("")
const result = ref({})
const isResult = ref(false)
const gameStarted = ref(false)
const game_winner = ref("")
const isAllDied = ref(false)
let time = null
let timeout = null
const tick = new Audio('/src/assets/sfx/lightOnnn.mp3')


function send() {
    if (!text.value.trim()) return
    socket.emit("msg", text.value.trim())
    text.value = ""
}

function startGame() {
    if (!socket.user_info.isHost) return
    socket.emit("start")
}

let showWinner = ref(false)



function set_timer(sec) {
    timeLeft.value = sec

    time = setInterval(() => {
        try {

            timeLeft.value--
        }
        catch (e) {

        }
    }, 1000);
    timeout = setTimeout(() => {
        clearInterval(time)
        if (isResult.value) {
            // isResult.value = false
        }
        timeLeft.value = null
    }, sec * 1000)
}

function end_timer() {
    clearTimeout(timeout)
    clearInterval(time)
    if (isResult.value) {
        // isResult.value = false
    }
    timeLeft.value = null

}

const input_handler = ()=>{
    if (text.value.length > 50) return text.value = text.value.slice(0, (text.value.length-1))
}

onMounted(() => {

    socket.on("start_timer", (sec) => { set_timer(sec) })
    socket.on("stop_timer", () => { end_timer() })

    socket.on("player_list", (p) => {
        players.value = Object.values(p)
    })

    socket.on("result", ({ sum, plr_val, plr_str }) => {
        if (!isLoggedIn.value) return
        // isResult.value = true
        showPick.value = false
        result.value = { winner: plr_str, sum: sum, value: plr_val }
        round_record.value.push({ winner: plr_str, calculated: sum, chosen: plr_val })
        console.log(round_record.value, result.value)
        picked.value = false
    })

    socket.on("game_end", () => {
        // players.value = []
        timeLeft.value = null
        round.value = null
        state.value = null
        showPick.value = false
        document.getElementById("start").style.display = "block"
        gameStarted.value = false
        socket.user_info.alive = true
    })

    socket.on("winner", (w) => {
        console.log(w)
        game_winner.value = w
        showWinner.value = true
        showPick.value = false
        setTimeout(() => {
            isResult.value = false
            round_record.value = []
            showWinner.value = false
            game_winner.value = ""
        }, 5000)
    })
    socket.on("all_died", () => {
        isAllDied.value = true
        showPick.value = false
        setTimeout(() => {
            isResult.value = false
            round_record.value = []
            isAllDied.value = false
            game_winner.value = ""
        }, 5000)
    })

    socket.on("notice", notice => {
        if (!isLoggedIn.value) return
        const ul = document.getElementById("notice")
        const li = document.createElement("li")
        li.id = "text"
        li.textContent = notice
        ul.appendChild(li)
    })

    socket.on("round_start", ({ round_no, timee }) => {
        if (!isLoggedIn.value) return
        if (!isResult.value) isResult.value = true
        document.getElementById("start").style.display = "none"
        gameStarted.value = true
        // isResult.value = false
        round.value = round_no
        state.value = "playing..."
        if (socket.user_info.alive) {
            showPick.value = true
        }
    })

    socket.on("death", () => { socket.user_info.alive = false })

    // socket.on("player_picked", (id) => {
    //     document.getElementById(id).classList.add = "picked"
    // })

    socket.on("end_picking", () => {
        showPick.value = false
        picked.value = false
    })


})

onUnmounted(() => {
    round_record.value = []
    socket.off("end_picking")
    socket.off("round_start")
    socket.off("notice")
    socket.off("game_end")
    socket.off("result")
    socket.off("player_list")
    socket.off("stop_timer")
    socket.off("start_timer")
})






</script>

<template>

    <div class="lobby_container">
        <div id="player_list">
            <ul id="players">
                <li v-for="player in players" class="player" :id="player.id"
                    :class="{ dead: !player.alive, picked: player.isPicked }">
                    <div class="info">
                        <span class="name" id="socket_name">
                            {{ player.name }}
                        </span>
                        <span class="score" id="socket_score">
                            score: {{ player.score }}
                        </span>
                    </div>
                    <div class="status" :class="{ 'is-Host': player.isHost }" id="socket_status">
                        {{ player.isHost ? "H" : "P" }}
                    </div>
                </li>
            </ul>
        </div>

        <div id="dashboard">
            <div class="panel">
                <span id="time">
                    {{ timeLeft > -1 ? timeLeft : "..." }}
                </span>
                <span style="justify-self: center;" id="round">
                    Round {{ round ? round : "..." }}
                </span>
                <span style="justify-self: end;" id="state">
                    {{ state ? state : "waiting..." }}
                </span>
            </div>
            <div id="dashboard_content">
                <Settings v-if="!gameStarted" />
                <winner v-if="showWinner" :winner="game_winner" />
                <AllDied v-if="isAllDied" />
                <!-- <var-result v-if="isResult" :title="winnerTitle" :description="winnerDesc">
                    <template #image>
                        :trophy:
                    </template>
</var-result> -->
                <Dashboard v-if="isResult" />
                <!-- <TvOverlay /> -->
            </div>
            <button @click="startGame()" id="start" :disabled="!socket.user_info?.isHost">Start</button>
        </div>

        <div id="notice_board">

            <ul id="notice">
            </ul>
            <input style="justify-self: stretch;" @input="input_handler" @keyup.enter="send()" v-model="text" type="text"
                placeholder="type here..." />
        </div>
    </div>

    <PickNum v-if="showPick" v-model:show="showPick" />

</template>

<style scoped>
body {
    background-color: black;
    /* background-image: url(../assets/Tenbin.svg); */
    background-image: linear-gradient(95deg, black, rgb(29, 29, 29), black);
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    background-clip: content-box;
}
</style>