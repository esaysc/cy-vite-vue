<!-- 对文章发表意见 -->
<template>
  
  <div style="margin: 20px 0" />
  <el-input
    v-model="textarea"
    maxlength="30"
    placeholder="Please input"
    show-word-limit
    type="textarea"
  />
  <el-button type="primary" >发表</el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const text = ref('')
const textarea = ref('')
</script>
