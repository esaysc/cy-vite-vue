<!-- 主页面 -->
<script setup lang="ts">
import MenuVue from '@/components/menu/Menu.vue';
import SiteSectionVue from '@/components/SiteSection.vue'
import ResponsiveHomeVue from '@/components/layout/ResponsiveHome.vue';
import useHomeStore from '@/store/modules/home'
import {onBeforeMount,onMounted,onBeforeUpdate,onRenderTracked,onRenderTriggered} from 'vue'
// 接收 store
const store = useHomeStore()
const info = store.info

const getInfo = () =>{
  info()
}
    // onMounted(() => {
    // 	console.log('onMounted')
    // })
    // onBeforeMount(() => {
    // 	console.log('onBeforeMount')
    // })
    // onBeforeUpdate(() => {
    // 	console.log('onBeforeUpdate')
    // })
    // // 每次渲染后重新收集响应式依赖
    // onRenderTracked(() => {
    // 	console.log('onRenderTracked')
    // })
    // // 每次触发页面重新渲染时自动执行
    // onRenderTriggered(() => {
    // 	console.log('onRenderTriggered')
    // })

</script>

<template>
  <div class="container">
    <!-- 轮播图组件 -->
    <SiteSectionVue class="site-section-vue"></SiteSectionVue>
  </div>
</template>

<style scoped>
.container{
  flex: auto;
}

</style>
