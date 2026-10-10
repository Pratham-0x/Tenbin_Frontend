<script setup>


</script>


<template>
    <div
        style="position: absolute; display: flex; justify-content: center; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.4);">
        <div id="died_plate" style="align-self: center;">
            <span >All Died</span>
        </div>
    </div>
</template>

<style scoped>
#died_plate {
    position: relative;
    font-family: fantasy;
    animation: opacity 0.3s infinite, entry 0.4s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
}

@keyframes opacity {
    0% {
        color: white;
    }

    100% {
        color: red;
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
</style>