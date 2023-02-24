<script setup lang="ts">
import { ref, reactive, onBeforeMount, onMounted, nextTick } from 'vue'

const starsCount = 800; // 流星数量
const distanceConst = 600; // 流星 间距
onMounted(()=>{

    })
// 存储dom数组
const itemRefs:any = []; // 普通获取dom

const setRef = (el:any) => {
  // myRef.value.push(el);
  itemRefs.push(el);
  // console.log(el);

};

nextTick(() => {
  // console.dir(myRef.value[60]);
  // 更新完 dom 数据后 调用 函数
  showStar();
});
// 显示星空背景  - 为每个 star 添加样式
const showStar = () => {
  itemRefs.forEach((item:any) => {
    var speed = 0.2 + (Math.random() * 1) //星速度 为 0.2 + 随机数 像素
    var distance = distanceConst + (Math.random() * 300) // 星间距 为静态间距 + 随机数 像素
    item.style.transformOrigin =
      `0 0 ${distance}px` //指定变形的基准点 x y z 偏移量（默认是center中心点，0 0 0 表示左上角）
    item.style.transform = // 使用样式
      `translate3d(0,0,-${distance}px) 	
      rotateY(${(Math.random()*360)}deg) 
      rotateX(${(Math.random()*-50)}deg) 
      scale(${speed},${speed})`
    //translate3d 3D 空间内移动元素的位置 （不能使用percentage值）
    // rotateX 使元素围绕X轴，顺时针旋转
    //scale(水平方向缩放，垂直方向缩放)	
    // console.log(item);
  })
};
</script>

<template>
  <div class="container">
    <!-- 流星雨特效 -->
    <div id="stars">
      <div class="star" v-for="(item, index) 
        in starsCount" :key="index" :ref="setRef">
      </div>
    </div>
  </div>
  
</template>

<style>
body {
		/* 在容器底部中心渐变，从红色开始，变成蓝色，最后变成绿色 */
		/* background: radial-gradient(20% 20% at center, #f7f7b6 0%, #dd698c 20%, #885e91, #212f5f); */
		/* background: radial-gradient(50% 100% at  center, #f7f7b6 0%, #dd698c 20%, #885e91, #212f5f); */
		/* background: radial-gradient(200% 100% at bottom center, #f7f7b6 0%, #dd698c 20%, #885e91, #212f5f); */
    width: 100vw;
    height: 100vh;
		background: radial-gradient(302% 105% at top center, #1b2947 10%, #75517d 40%, #e38aba 75%, #eef7d4);
		background-attachment: fixed;
	}

	/* 关键帧 旋转 */
	@keyframes rotate {

		/* from / 0% 动画的第一时刻 */
		0% {
			/* transform: perspective(500px) rotateZ(0deg) rotateX(-40deg) rotateY(0); */
			transform: perspective(500px) rotateZ(0deg) rotateX(-40deg) rotateY(0);
		}
		/* to / 100% 动画的最终时刻 */
		100% {
			transform: perspective(500px) rotateZ(0deg) rotateX(-40deg) rotateY(-360deg);
		}
	}

	#stars {
		/* 
		perspective：
			若父元素应用了透视 perspective xx px, 
			子元素的transform属性值可为perspective(yy px), 
			yy值越小 => 焦距越小 效果类似广角 
			yy值越大 => 焦距越远 效果类似远景
			通常yy小于xx值 过大的yy值 区别不明显 
		*/

		transform: perspective(500px);
		/* 
			transform-style 设置元素的子元素是位于 3D 
			空间中还是平面中 
			flat | preserve-3d （不会被子元素继承）  
		*/
		transform-style: preserve-3d;
		/* fixed	
			生成绝对定位的元素，相对于浏览器窗口进行定位。
			元素的位置通过 “left”, “top”, “right” 以及 “bottom” 属性进行规定。 
		*/
		position: fixed;
		/* perspective-origin: 设置 3D 元素的基点位置 */
		perspective-origin: 50% 100%;
		left: 50%;
		/* 
		animation：
			调用动画的名称（whirling）
			完成从0度到360度所需要的是间（1s）
			调用动画速度曲线（linear 匀速）
			动画的执行次数（infinite 无限）
		 */
		animation: rotate 166s infinite linear;
		bottom: 0;
		z-index: -99;
	}

	.star {
		width: 2px;
		height: 2px;
		background: #f7f7b8;
		position: fixed;
		top: 0px;
		left: 0;
		/* 
		 backface-visibility = 
		   visible  |
		   hidden   
		    指定当元素背面朝向观察者时是否可见
		*/
		backface-visibility: hidden;
	}
  </style>
