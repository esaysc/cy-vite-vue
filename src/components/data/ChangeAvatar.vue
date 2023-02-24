<template>
  <div class="container">
    <!-- 头像 -->
    <el-avatar shape="square" :size="100" :fit="fit" :src="url" />
    <el-upload
      class="avatar-uploader "
      action="http://127.0.0.1:4000/api/upload"
      :http-request="upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    
    
  </div>
  
</template>

<script lang="ts" setup>
import { ref,reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import axios, { type Method } from 'axios'

import type { UploadProps } from 'element-plus'
import useUserStore from '@/store/modules/user' // 引入用户仓库
const userStore = useUserStore()
const {user} = userStore
const state = reactive({
  fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
  url: user.avatar,
})
console.log("avatar::",user.avatar);

let fit = state.fits[2]
let url = state.url
const imageUrl = ref('')
console.log("url::",url);

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}
// 上传
const upload = (item:any) =>{
  console.log("name",item.file.name);
  const userId = user.userId
  let formData = new FormData()
    formData.append('photo', item.file)
    formData.append("userId", userId);
    axios({
      method: 'post',
      // url: "http://localhost:4000/api/upload",
      url: "http://43.136.179.5:8048/api/upload",
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime() }
    }).then(function (res) {
      console.log(res)
    }).catch(function (error) {
      console.log(error)
    })
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('Avatar picture must be JPG/PNG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<style scoped>
/* 容器样式 */
.container{
  display: flex;
  justify-content: space-between;
  margin: 20px;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>


/* 上传框样式 */
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
