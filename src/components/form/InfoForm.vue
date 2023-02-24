<template>
  <div v-if="refresh">
  <!-- 头像 -->
  <el-avatar shape="square" :size="100" :fit="fit" :src="url" />
  <!-- 头像上传 -->
  
  <el-form :model="form" label-width="120px" ref="ruleFormRef" :rules="rules">
    <el-form-item label="昵称" prop="nickname">
      <el-input v-model="form.nickname" />
    </el-form-item>
    <el-form-item label="用户名">
      {{ username }}
    </el-form-item>
    <el-form-item label="出生日期" prop="date">
      <el-col :span="11">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
      
      
    </el-form-item>
   
    
    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="form.gender">
          <el-radio label="1">男</el-radio>
          <el-radio label="0">女</el-radio>
          <el-radio label="3">保密</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="个人签名" prop="headline">
      <el-input v-model="form.headline" type="textarea" />
    </el-form-item>
    <!-- 保存 重置 -->
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
  
  
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted,toRaw } from 'vue'
import useUserStore from '@/store/modules/user'
import useLoginStore from '@/store/modules/login'
import { validateUserName,validateNickName } from '@/utils/rules'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'

const loginStort = useLoginStore()
const { userInfo } = loginStort
// 通过用户仓库 调用请求用户详细信息
const userStore = useUserStore()

const {getUserInfo,saveUserInfo,result,user} = (userStore)

  const {username,birth,nickname,gender,headline,avatar} = toRefs(user)
    const usernameOld = username
    console.log('user', user)
    console.log('username', username)

    console.log('nickname', nickname)

// 通过登录仓库获取用户基本信息 用以 请求用户详细信息
// 通过用户仓库 调用请求用户详细信息

let fit = ref('')
let url = ref('')
// 头像的状态
  const state = reactive({
  fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
  url: avatar,
})
fit.value = state.fits[2]
url.value = state.url






// 与form表单ref绑定 开启规则验证
const ruleFormRef = ref<FormInstance>()
// 表单的字段 
const form = reactive({
  nickname: nickname,
  date: birth,
  gender: gender,
  headline: headline,
})

// 通过onMounted 发送默认请求 初始页面是填充原始数据
// 函数：用户名 获取 用户信息



// 判断规则
// 1、判断用户名是否合规
const validatorUserName  = (rule:any, value:any, callback:any) => {
  if (!value) {
    return callback(new Error("请输入昵称"));
  } else {
    setTimeout(() => {
      if (validateNickName(value)) {
        callback();
      } else {
        return callback(new Error('昵称格式不正确'))
      }
    }, 1000)
  }
};
// 使用自定义的验证规则
const rules = reactive({
  nickname:[{ validator: validatorUserName, trigger: 'blur' }],

})
// 提交
const submitForm = (formEl: FormInstance | undefined) => {
  // 判断需要提交的表单 
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid && (form.nickname != nickname || form.date != birth || form.gender != gender || form.headline != headline)) {
      console.log('submit!')
      console.log('username', username)
      const params = {
        username: username,
        nickname: form.nickname,
        birth: form.date,
        gender: form.gender,
        headline: form.headline,
      }
      saveUserInfo(params).then(()=>{

        if(result.value.code==200){
          const params = {
            username: userInfo.data.username
          }
          getUserInfo(params)
          ElMessage({
            message: result.value.data.info,
            type: 'success',
          })
        }else{
          ElMessage.error(result.value.data.info)
        }
        
      })
      

      
    } else {
      console.log('error submit!')
      return false
    }
  })
}
// 重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const refresh = ref(true)

// if(username){
//   refresh.value = true

// }
</script>
