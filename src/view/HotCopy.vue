<script setup lang="ts">
  import { ref, reactive, onBeforeMount, onMounted } from 'vue'
  import HotPage from '@/components/page/HotPage.vue';
  onMounted(()=>{ 
    // 获取li 行 元素列表
    const rows = document.querySelectorAll('#ui ul li') as NodeListOf<HTMLElement>
    // 获取文档元素
    const html = document.documentElement
    // 监听滚动事件
    document.addEventListener('scroll',(e) => {
      // 计录滚动条的 变化 0~1
      let scrolled = html.scrollTop / (html.scrollHeight - html.clientHeight) // 0~1表示滚动条顶点位置 0/793~793/793
      // console.log('scrollHeight', html.scrollHeight) // 1522 整个滚动条长度
      // console.log('clientHeight', html.clientHeight) //729 显示区域高度
      // console.log('scrollTop', html.scrollTop) // 0 ~ 1522-729 滚动条所处高度 在第一页顶点0 到 最后一页顶点793加上显示区域=滚动条总长度
      // console.log('scrollTop+clientHeight', html.scrollTop+html.clientHeight) // 729 ~ 1522

      // 存储列表每一个元素 所占的比值
      let total = 1 / rows.length
      // for (let [index, row] of rows.entries()){
      //   let start = total * index
      //   let end = total * (index + 1)

      //   let progress = (scrolled - start) / (end - start)
      //   if(progress >=1) progress = 1
      //   if(progress <=0) progress = 0

      //   row.style.setProperty('--progress',progress)
      // }
      // 计算滚动条的位置 添加样式
      rows.forEach(function f(row, index, list) {
        // 计算每一行从起始位置到结束位置 区间范围 将所有行的区间范围 相加为 1
        let start = total * index
        let end = total * (index + 1)
        // console.log(`row ${index}: ${start} - ${end}`)

        // scrolled 0~1 滚动条当前位置减去 这一行起始位置 除以 每一行的区间范围 == 该区间在滚动条中是否达标 满足则显示
        // console.log('scrolled', scrolled)
        // console.log('start', start)
        // console.log('end', end)
        // console.log('scrolled - start', scrolled - start)
        // console.log('end - start', end - start)
        // console.log('(scrolled - start) / (end - start)', (scrolled - start) / (end - start))

        // ——+——+——+——+——+——+——+——+——+——+——+——+——+—— 分成14份 滚动条 每滚动两个——+——表示显示一行
        // -------------- 分成14份 每两个-表示一行
        // ——+ 与每 - -- --- ---- ... 行进行计算比值 不够两份 所以什么都不显示
        // ——+——+ 与每 - -- --- ---- ... 行进行计算比值 刚好两份 显示第一行
        // ——+——+——+ 与每 - -- --- ---- ... 行进行计算比值 大于两份小于四份 显示第一行 加若隐若现的第二行
        // ...
        let progress:number = (scrolled - start) / (end - start)
        // 对超出范围的向下取值0/1
        if(progress >=1) progress = 1
        if(progress <=0) progress = 0
        row.style.setProperty('--progress',progress + "")
      }, this);

    })
  })
  
  
</script>

<template>
  <div class="containers">
    <!-- <div class="wrapper">
      <div class="one item">One</div>
      <div class="two item">Two</div>
      <div class="three item">Three</div>
      <div class="four item">Four</div>
      <div class="five item">Five</div>
      <div class="six item">Six</div>
    </div> -->
   
    <div id="box">
      <div id="hardware"></div>
      <div id="ui">
        <ul v-for="item in 7">
          <li style="--progress: 0;" >{{ item }}</li>
        </ul>
      </div>
    </div>

  </div>
  <HotPage></HotPage>
</template>

<style lang="scss" scoped >
  $device-width: 700px;
  $device-height: 1336px;
  $ui-width: 640px;
  $progress: var(--progress,0.5);
  // $progress: 0.5;

  
  $main-color: var(--mainColor,#fd6262);
  :root{
    font: size 15px;
    

  }
  h2{
    font-size: 64px;
    color: #FFF;
  }
  .containers {
    background-color: #000;
    margin: 0;
    display: flex;
    flex-direction: columns;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
    padding: 4rem 0;
    color: #FFF;
  }
  #box{
    top:200px;
    position: relative;
    width: $device-width;
    height: $device-height;

  }
  #hardware{
    width: 100%;
    height: 100%;
    background-color: $main-color;
  }
  #ui {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

  }
  #ui .top-ui {
    display: block;
    width: $ui-width;
    height: auto;
    margin: 70px auto 0;
    padding-bottom: 1px solid #222;

  }
  #ui li {
    list-style: none;
    margin: 0;
    padding: 0;

  }
  #ui ul li {

    display: block;
    width: $ui-width;
    height: 100px;
    background-color: beige;
    margin: 10px auto;
    padding-bottom: 10px;
    border-bottom: 1px solid #222;
    // progress
    $progress:var(--progress);
    // 变量改变时 变形效果 放大 从 1.8 到 1 ， 从上方开始 从 -60px 到 0
    transform: scale(calc(1.8 - 0.8*$progress)) translateY(calc(-60px * ( 1 - $progress)));
    // transition: .25s transfrom ease-in-out;

    opacity: $progress;


  }

</style>
