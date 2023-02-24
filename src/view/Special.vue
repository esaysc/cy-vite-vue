<script setup lang="ts">
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
import StarrySkyVue from '@/components/special/StarrySky.vue';
import Fireworks from '@/components/special/Fireworks.vue'
</script>

<template>
	<div class="container">
		<StarrySkyVue></StarrySkyVue>
		<Fireworks></Fireworks>
	</div>
</template>

<style scoped></style>

