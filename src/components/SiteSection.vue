<!-- swiper 轮播图 => 循环插入 CarouselCardVue 并提供数据 -->
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue"
import { EffectFade } from 'swiper';
// Import Swiper styles
import "swiper/css"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// 引入Carousel Card
import CarouselCardVue from './card/CarouselCard.vue'
import useHotStore from '@/store/modules/hot'
const hotStore = useHotStore()
const {getHotArticle,HotArticles} = hotStore
getHotArticle()
const posts = reactive([
{
    url:new URL(`../assets/image/taocheng.jpg`, import.meta.url).href,
    name: "稻城亚丁",
  },
  {
    // url: require("../assets/image/峨眉山.jpg"),
    url:new URL(`../assets/image/ems01.jpg`, import.meta.url).href,
    name: "峨眉山",
  },
  {
    // url: require("../assets/image/欢乐谷.jpg"),
    url:new URL(`../assets/image/hualegu.jpg`, import.meta.url).href,
    name: "成都欢乐谷",
  },
  {
    // url: require("../assets/image/九寨沟01.jpg"),
    url:new URL(`../assets/image/jiuzhaigou01.jpg`, import.meta.url).href,
    name: "九寨沟",
  },
])
const isShow = true;
const onSwiper = (swiper: any) => {
      // console.log(swiper);
    };
const onSlideChange = () => {
  // console.log("slide change");
};
const modules = [Navigation, Pagination, Scrollbar, A11y]
</script>


<template>
  <div>

  <Swiper :centeredSlides="isShow" :loop="isShow"
    :slides-per-view="1"
    :modules="modules"
    :space-between="50"
    navigation
    :pagination="{ clickable: true }"
    :scrollbar="{ draggable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange">
    <SwiperSlide v-for="(item, index) in posts" :key="index" >
      <CarouselCardVue :name="item.name" :url="item.url" class="carousel-card-vue"></CarouselCardVue>
    </SwiperSlide>
  </Swiper>
  </div>
  
</template>
 

 
<style scoped lang="less">
  
.swiper {
  width: 100%;
  height: 100%;
 
  // margin: calc(50% - 250px) auto;
  .swiper-slide {
    height: 100%;
    text-align: center;
  }
}
.carousel-card-vue{
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper :deep(.swiper-pagination .swiper-pagination-bullet) {
  background: rgb(255, 0, 0);
}
.swiper :deep(.swiper-pagination .swiper-pagination-bullet-active) {
  background: rgb(0, 247, 255);
}
</style>