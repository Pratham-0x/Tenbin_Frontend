<script setup>

import Logo from '../assets/Tenbin_Logo.svg'
</script>

<template>
	<div
	        style="position: absolute; display: flex; z-index: 999; align-items: center; top:10px; left: 10px; height: clamp(20px,5%,40px);">
	        <img height="200%" :src="Logo" alt="Logo" />
	        <img height="100%" src="../assets/Tenbin.svg" alt="TENBIN" />
	    </div>
</template>
