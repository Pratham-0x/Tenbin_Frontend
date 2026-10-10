<script setup>
import { indexOf, size } from 'lodash';
import { useGame } from '../composables/useGame';
const { round_record } = useGame()
</script>

<template>
    <ul id="result_board">
        <li style="
        font-weight: bolder;
    " class="board">
            <div>round</div>
            <div style="justify-self: center;">winner</div>
            <div style="justify-self: center;">chosen</div>
            <div style="justify-self: center;">calculated</div>
        </li>
        <li class="board list" :class="{'new_row': (indexOf(round_record, record)+1) === size(round_record) }" v-for="record in round_record" :key="indexOf(round_record, record)+1">
            <div>{{ indexOf(round_record, record) + 1 }}</div>
            <div style="justify-self: center;">{{ record.winner }}</div>
            <div style="justify-self: center;">{{ record.chosen }}</div>
            <div style="justify-self: center;">{{ record.calculated }}</div>
        </li>
    </ul>
</template>

<style scoped>
#result_board {
    width: 100%;
    overflow: scroll;
    scrollbar-width: none;
}

.board {
    display: grid;
    grid-template-columns: 50px repeat(3, 1fr);
    width: 100%;
    align-items: center;
}

.list{
    background-color: rgb(26, 26, 26);
    background-image: none;
}

.new_row{
    animation: slide 0.4s ease;
    background-color: rbg(0,255,0,0.1);
}
@keyframes slide {
    from{
        opacity: 0;
        transform: translateX(-100%);
        max-width: 0;
    }
    to {
        opacity: 1;
        transform: translateX(0);
        max-width: 100%;
    }
}
</style>