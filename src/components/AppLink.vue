<!-- a标签 链接 总样式控制 -->
<script setup lang="ts">
var to = "/home"
var tag = "li"
</script>

<template>
  <router-link :to="to" :tag='tag'>
    <slot></slot>
  </router-link>
</template>

<style scoped>
a:link {
    color:#FF0000;
    text-decoration:none;
}

a:visited {
    /* color:#00FF00; */
    text-decoration:none;
}
    
a:hover {
    color:#000000;
    text-decoration:none;
    }
    
a:active {
    color:#FFFFFF;
    text-decoration:none;
}
</style>
