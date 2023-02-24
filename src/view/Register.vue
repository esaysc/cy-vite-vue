<template>
  <div class="container">
    <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    >
    <!-- 用户名 -->
    <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" />
    </el-form-item>
    
    <!-- 密码 -->
    <el-form-item label="密码" prop="pass">
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" show-password/>
    </el-form-item>
    <el-form-item label="请再次确定密码" prop="checkPass">
      <el-input
        v-model="ruleForm.checkPass"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <!-- 邮箱 -->
    <el-form-item
      prop="email"
      label="Email"
      :rules="[
        {
          required: true,
          message: 'Please input email address',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: 'Please input correct email address',
          trigger: ['blur', 'change'],
        },
      ]"
    >
      <el-input v-model="ruleForm.email" />
    </el-form-item>
    <!-- 性别 -->
    <el-form-item label="性别">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio label="1">男</el-radio>
          <el-radio label="0">女</el-radio>
          <el-radio label="2">未知</el-radio>

        </el-radio-group>
    </el-form-item>
    <!-- 提交 或 重置 -->
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >注册</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import useLoginStore from '@/store/modules/login';
import { reactive,ref,toRaw} from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { validateUserName,validatePassword } from '@/utils/rules'
import { useRouter } from 'vue-router'
// 路由跳转
const router = useRouter();
const store = useLoginStore()
const {register,registerInfo,setRegisterInfo} = store
const ruleFormRef = ref<FormInstance>()
// 判断用户名是否合规
const validatorUserName  = (rule:any, value:any, callback:any) => {
  if (!value) {
    return callback(new Error("请输入用户名"));
  } else {
    setTimeout(() => {
      if (validateUserName(value)) {
        callback();
      } else {
        return callback(new Error('用户名格式不正确'))
      }
    }, 1000)
  }
};

// 判断密码是否合规
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else {
    setTimeout(() => {
      if(validatePassword(value)){
        if (ruleForm.checkPass !== '') {
          if (!ruleFormRef.value) return
          ruleFormRef.value.validateField('checkPass', () => null)
      }
      callback()
      }callback(new Error('密码格式有误'))
      
    }, 1000)

  }
}
// 判断两次密码是否一致
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else {
    setTimeout(() => {
      if (value !== ruleForm.pass) {
        callback(new Error("两次密码不一致!"))
      } else {
      callback()
      }
    }, 1000)
  }
}
// 判断性别
const validateGender = (rule: any, value: any, callback: any) => {
  console.log(value);
// 注册成功跳转到登录页面


}
const ruleForm = reactive<{
  email: string
  username: string,
  gender: any,
  pass: string,
  checkPass: string,
}>({
  email: '',
  username: '',
  gender: '3',
  pass: '',
  checkPass: '',
})

const rules = reactive({
  pass: [{ validator: validatePass, trigger: ['blur', 'change'] }],
  checkPass: [{ validator: validatePass2, trigger: ['blur', 'change'] }],
  username:[{ validator: validatorUserName, trigger: ['blur', 'change'] }],
  gender:[{ validator: validateGender, trigger: ['blur', 'change'] }]

})




// 提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      console.log("ruleForm:",ruleForm);
      const formValue = JSON.stringify(ruleForm)
      console.log("formValue:",formValue);
      // register(formValue).then((res:any) => {
      //   console.log(res);
        
      // })
      const params = {
        username: ruleForm.username,
        password: ruleForm.pass,
        email: ruleForm.email,
        gender: ruleForm.gender,
      }
      register(params)
      store.$subscribe((mutation,state) => {
          if (state.registerCode == 200){
              console.log("toLogin");
              router.push('/login')

              console.log("登录成功");
            }
            else{
              ElMessage.error(registerInfo.data.info)

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
</script>

<style scoped>
/* 容器样式 */
.container{
  width:80%;
  margin: auto;
  margin-top: 12%;

}
</style>
