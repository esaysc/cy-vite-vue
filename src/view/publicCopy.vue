<script setup lang="ts">
  import { ref, reactive, onBeforeMount, onMounted,toRefs } from 'vue'
  import COS from 'cos-js-sdk-v5';
  import useLoginStore from '@/store/modules/login'
  import useCos from '@/utils/cosPublic'
  
  const loginStore = useLoginStore()
  const {userInfo} = loginStore

var Bucket = 'cy-public-1314976122';  /* 存储桶，必须字段 */
var Region = 'ap-chengdu';     /* 存储桶所在地域，必须字段 */
// 目录为 type/username/filename
var directory = ''
var filename = ''
var type = 'article'

var cos = new COS({})
onMounted(()=>{
  /* 选择文件 */
  // 上传文件
  const btn = document.getElementById('submitBtn') as HTMLElement | null;
  const msg = document.getElementById('msg') as HTMLElement;
  if(btn!=null){
    btn.onclick = function (e) {
      console.log('btn点击')
      const input = document.getElementById('fileSelector') as HTMLInputElement | null;

      if(input!=null && input.files!=null){
          var file = input.files[0];
        if (!file) {
          msg.innerText = '提示：未选择上传文件';
          return;
        }
        filename = input.files[0].name
        msg.innerText = '';
        directory = useCos.dateDirectory(type,userInfo.data.username,filename)
        console.log('directory:', directory)
        cos = useCos.createCos(Bucket,directory)
        useCos.handleFileInUploading(Bucket,Region,directory,file);
      };
    }
  }

  // 获取指定图片连接
  const btn2 = document.getElementById('submitBtn2') as HTMLElement;
  btn2.onclick = function (e) {
    directory = "article/aa/1677197236138-85fd56e0f3491e2617ea9971b57f0e0a.png"
    console.log('btn2点击')
    const input = document.getElementById('fileSelector') as HTMLInputElement | null;

      if(input!=null && input.files!=null){
          var file = input.files[0];
        if (!file) {
          msg.innerText = '提示：未选择上传文件';
          return;
        }
        filename = input.files[0].name
        msg.innerText = '';
        cos = useCos.createCos(Bucket,directory)
        useCos.getImgUrl(Bucket,Region,directory)
      };

  }
  
})


</script>

<template>
  <div class="containers">
    <!-- html 页面 DOM 元素 -->

    <!-- 选择要上传的文件 -->
    <input id="fileSelector" type="file" />
    <!-- 点击按钮上传 -->
    <input id="submitBtn" type="submit" />
    <div id="msg"></div>
     <!-- 点击按钮获取图片url -->
     <input id="submitBtn2" type="submit" />
    <div id="msg2"></div>
  </div>
</template>

<style scoped>
  
</style>
