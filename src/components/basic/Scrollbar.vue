<!-- 全局滚动条 -->
<template>
  <!-- max-height="700px" -->
  <el-scrollbar height="740px" ref="scrollMenuRef">
    <slot></slot>
  </el-scrollbar>
</template>

<script lang="ts" setup>

import {onMounted,ref} from 'vue';
const scrollMenuRef:any = ref(null);
    onMounted(()=>{
      console.log('scrollMenuRef', scrollMenuRef.value)

    })

</script>

<style lang="less" scoped>
/deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>
