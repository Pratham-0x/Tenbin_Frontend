<template>
<div class="screen-overlay" aria-hidden="true">
    <div class="screen-overlay__glow"></div>
    <div class="screen-overlay__reflection"></div>
    <div class="screen-overlay__edges"></div>
</div>
</template>

<style scoped>
.screen-overlay {
    position: absolute;
    inset: 0;
    z-index: 100;
    pointer-events: none;
    overflow: hidden;
}

.screen-overlay__glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
        ellipse at center,
        rgb(255 255 255 / 25%),
        transparent 75%
    );
}

.screen-overlay__reflection {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        165deg,
        rgb(255 255 255 / 3%) 0%,
        rgb(255 255 255 / 0.7%) 12%,
        transparent 35%,
        transparent 100%
    );
}

.screen-overlay__edges {
    position: absolute;
    inset: 0;
    background: radial-gradient(
        ellipse at center,
        transparent 60%,
        rgb(0 0 0 / 5%) 100%
    );
}
</style>