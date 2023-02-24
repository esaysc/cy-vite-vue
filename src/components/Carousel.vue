<!-- element轮播图 -->
<template>
  <div class="contents">
    <div class="content">
      <el-carousel
        :interval="8000"
        type=""
        height="300px"
        indicator-position="outside"
      >
        <el-carousel-item v-for="item in carouseData" :key="item">
          <img :src="item.url" alt="item.name" class="carousel-img" />
          <div>{{ item.name }}</div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script lang="ts" >
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
export default {
  name: 'Carousel',
  setup () {

    console.log('1-开始创建组件-setup')
    const data = reactive({
      carouseData: [{}],
    })
    onBeforeMount(() => {
      console.log('2.组件挂载页面之前执行----onBeforeMount')
    })
    onMounted(() => {
      console.log('3.-组件挂载到页面之后执行-------onMounted')
    })

    const carouseData = [
      {
        url: require("@/assets/image/稻城.jpg"),
        name: "稻城亚丁"
      },
      {
        url: require("@/assets/image/乐山大佛.jpg"),
        name: "峨眉山"
      },
      {
        url: require("@/assets/image/欢乐谷.jpg"),
        name: "成都欢乐谷"
      },
      {
        url: require("@/assets/image/九寨沟01.jpg"),
        name: "九寨沟"
      }
    ]
    return {
      ...toRefs(data),
      carouseData
    }
  },
}

</script>
<style scoped>
.contents {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  border: 1px solid green;
  text-align: center;
}
.content {
  width: 80%;
  text-align: center;
}
.carousel-img {
  width: 100%;
  height: 80%;
  object-fit: cover;
  object-position: 50% 20%;
}
</style>
        
 