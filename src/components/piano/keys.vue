<script setup lang="ts">
import { ref, HTMLAttributes, ComponentPublicInstance , onMounted } from 'vue'
// 给钢琴添加音频
for (let i = 1; i <= 8; i++) {
  var addaudio = document.createElement("audio");
  let n:number
  n=i % 7
  if(i%7==0){
    n = 7
  }
  addaudio.setAttribute("src", "../../public/mp3/"+n+".mp3");
  document.body.appendChild(addaudio);
}
// for (var i = 1; i <= 5; i++) {
//   var addaudio = document.createElement("audio");
//   addaudio.setAttribute("src", "/public/mp3/" +i+ ".mp3");
//   document.body.appendChild(addaudio);
// }
let audios = document.getElementsByTagName("audio"),
itemRefs: Array<any> = [],
divItemRefs: Array<any> = [];

const setItemRefs = (el: HTMLElement | ComponentPublicInstance | HTMLAttributes, item:number) => {
  if(el) {
    itemRefs.push({
      id: item,
      el,
    });
  }
}
const setDivItemRefs = (el: HTMLElement | ComponentPublicInstance | HTMLAttributes, item:number) => {
  if(el) {
    divItemRefs.push({
      id: item,
      el,
    });
  }
}

// 操作键盘钢琴白键发出声音
var keyCodes = new Array(83, 68, 70, 71, 72, 74, 75, 76, 69, 82, 89, 85, 73);

window.addEventListener("keydown", function(event) {
  let str = "KeyboardEvent: key='" + event.key + "' | code='" +
            event.code + "'";
  let el = document.createElement("span");

  if(parseInt(event.key)>0 && parseInt(event.key)< 8){
    let n:number = parseInt(event.key)-1,
    m:number = (n + 2) % 7,
    h:number = (n + 4) % 7;
    if( m == 0){
      m = 7
    }
    if( h == 0){
      h = 7
    }
    

    audios[n].load();
    audios[m].load();
    audios[h].load();
    audios[n].play();
    audios[m].play();
    audios[h].play();
  }
  el.innerHTML = str + "<br/>";
  console.log('str :>> ', str);

}, true);
onMounted(() => {
			// DOM元素将在初始渲染后分配给ref
      divItemRefs.forEach(function(e:any) {
        e.el.onmousedown = () => {
          console.log('点击琴键 :>> ');
          audios[e.id-1].load();
          audios[e.id-1].play();
        }
        console.log('e :>> ', e);

      })
      console.log(divItemRefs);

})

</script>

<template>
  <div class="container">
    
    <ul>
      <li v-for="(item, index) in 8" :ref="(el:any) => setItemRefs(el, item)">
        <div :ref="(el:any) => setDivItemRefs(el, item)"></div>
        <p v-if="index == 0 || index == 1 || index == 3 || index == 4 || index == 5"></p>
      </li>
    </ul>

  </div>
</template>

<style scoped>
 .test{
  background-color: #000;
 }
 /*-------钢琴部分--------*/
 ul{
  width:480px;
  height:360px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
 }
 li{
  float:left;
  list-style-type: none;
  position: relative;
 }
 li>div{
  height: 360px;
  width: 60px;
  background: rgba(255,255,255,.3);
  border: 1px solid;
  border-color:rgba(0, 0, 0, .8);
  border-bottom-left-radius : 8px;
  border-bottom-right-radius: 8px;
  box-sizing: border-box;
  box-shadow: /*inset  3px 0  10px  #c9c6c6,*/
     inset 5px -8px  0  #00000023;
  text-align: center;
  display:table-cell;
  vertical-align: bottom;
 }
 li:not(:last-child)>div{
  border-right: none;
 }
 li>div:hover{
  background: rgb(255, 97, 97);
 
 }
 /* 当白键按下时的样式 */
 .white_active{
  box-shadow: inset 3px -2px  0  #00000036;
  background: linear-gradient(45deg, rgba(255,255,255,.7), rgba(255,255,255,.5));
 }
 
 li>p{
  height: 200px;
  width: 40px;
  background-color: #000;
  border-bottom-left-radius : 5.5px;
  border-bottom-right-radius: 5.5px;
  box-shadow: inset 5px -7px 0 #2c2c2c;
  position: absolute;
  top:0;
  left: 40px;
  z-index: 999;
 }
 li>p:hover{
  background: linear-gradient(45deg, #4c4c4c, #444444);
 }
 /* 当黑键按下时的样式 */
 .black_active{
  box-shadow:inset 3px -5px 0 #2c2c2c;
 }

</style>
