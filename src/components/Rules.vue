<script setup>
import { useGame } from '../composables/useGame';
const { isRules } = useGame()
</script>

<template>

    <div id="rules" @click="isRules = true">Rules</div>
    <div id="rules_board" v-if="isRules">
        <span id="rules_content">
            <h1 style="text-align: center; width: inherit; ">
                <span style="border-bottom: 2px solid white; font-family: monospace;">
                    Game Instructions
                </span>
            </h1>
            <ol style="list-style: circle;">
                <li style="background-color: black;">Hello</li>
                <li>second rule</li>
            </ol>
            <span @click="isRules = false"
                style="display: inline-block; width: inherit; margin: auto; font-family: monospace; cursor: pointer; padding: 10px; text-align: center;">
                <span style="border: 1px solid white; padding: 10px;">
                    close
                </span>
            </span>
        </span>
    </div>

</template>

<style scoped>
ol{
    list-style: decimal;
    /* border: 2px solid white; */
    padding: 20px;
    height: 80%;
    font-family: sans-serif;
    width: max(70%, 344px);
    aspect-ratio: 1/1;
    margin: auto;
}
ol > li{
    background: none;
    list-style: decimal;
}
#rules_wrapper{
    overflow: hidden;
    height: 100dvh;
    width: 100dvw;
    position: absolute;
    top: 0;
    left: 0;
}
#rules {
    border-bottom: 2px solid white;
    cursor: pointer;
    font-size: 24px;
    color: white;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 99;
}

#rules_board {

    color: white;
    position: absolute;
    overflow: hidden;
    left: 0;
    top: 0;
    background-color: black;
    width: 100%;
    height: 100%;
    z-index: 999;

}

#rules_content {
    box-shadow: 1px 1px 10px rgba(24, 24, 24, 0.589);
    position: absolute;
    display: flex;
    flex-direction: column;
    padding: 10px;
    left: 50%;
    top: 50%;
    background-color: black;
    width: 85dvw;
    height: 85dvh;
    translate: -50% -50%;
    animation: entryX 0.5s forwards;
}
#rules_content > * {
    justify-content: center;
    align-items: center;
}

@keyframes entryX {
    0% {
        transform: perspective(400px) rotateY(10deg);
        transform-origin: left center;
        opacity: 0;
    }

    100% {
        opacity: 1;
        transform-origin: left center;
        transform: perspective(400px) rotateY(0deg);
    }
}
</style>