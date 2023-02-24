<!-- 评论区 -->
<script setup lang="ts">
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
import AvatarVue from './data/Avatar.vue';
import RemarkCardVue from './card/RemarksCard.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        
        <AvatarVue></AvatarVue>
      </el-aside>
      <el-main class="el-main">
        <div class="main">
          <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="content">
            夏日还未到来，风起时带来的也仅有阵阵冰凉。 天，有吹起了大风，树叶被风吹得沙沙响，一会儿下起了毛毛细雨，看一行行小蚂蚁匆忙搬家，我是喜欢蹲在地上看时光的痕迹，像是一行行的小蚂蚁穿越了我的记忆，记忆里有什么呢？不是江南的烟雨，不是美丽的稻城，是山一座，水一条，是梦里蝴蝶翩翩起舞，欢笑在重叠，嬉笑如梦里，河堤杨柳依依，河岸长发女唱着《相思泪》，河水中央几条小船缓缓流淌，轰隆隆，打雷了，总归梦一场。 有一个地方叫做稻城，我要和我最心 爱的人一起去到那里，看蔚蓝的天空，看 白色的雪山，看金黄的草地，看一场秋天 的童话。我们终将会牵手旅行，凤凰稻城 或是巴黎
          </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="4" :sm="12" :md="14" :lg="16" :xl="18"></el-col>
              <el-col :xs="20" :sm="12" :md="10" :lg="8" :xl="6">
                <div class="tag">
            <el-tag class="ml-2" type="info">举报</el-tag>
            <el-tag class="ml-2" type="info">楼</el-tag>
            <el-tag class="ml-2" type="info">日期</el-tag>
            
            <el-tag>回复</el-tag>

          </div>
              </el-col>
            </el-row>
          
          
        </div>
        
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.el-main{
  background-color: antiquewhite;
}
.main{
  height: 100%;
  width: 100%;
  background-color: aquamarine;
}
.content{
  background-color: rgb(190, 116, 116);
}
.remarks-card-vue{
  margin-right: 2px;
}
</style>

