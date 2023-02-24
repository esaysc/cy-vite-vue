<!-- 此卡片 => 图片加文字描述 用于放在轮播图（SiteSectionVue）中进行循环 -->
<!-- 由调用此组件者 提供数据 （标题，图片路径） -->
<script lang="ts" setup>
import { ref } from 'vue'
const currentDate = ref(new Date())
interface Props {
  name: string,
  url: string,
}

const props = defineProps(['name','url'])
</script>



<template>
  <el-row>
    <el-col
      :span="14"
    >
      <el-card :body-style="{ padding: '0px' }">
        <img
          :src="url"
          class="image"
        />
        <div style="padding: 14px">
          <span>{{ name }}</span>
          <div class="bottom">
            <time class="time">{{ currentDate }}</time>
            <el-button text class="button">{{ name }}</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>



<style>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  height: 300px;
  display: block;
  object-fit: cover;
}
</style>
