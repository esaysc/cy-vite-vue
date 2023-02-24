
<script lang="ts" setup>
import { reactive,ref,toRaw} from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { validateTitle,validateArticle } from '@/utils/rules'
import useUserStore from '@/store/modules/user'
import useHotStore from '@/store/modules/hot'
// 接收仓库
const userStore = useUserStore()
const hotStore = useHotStore()

const { user } = userStore
const { publishArticle } = hotStore
const ruleFormRef = ref<FormInstance>()
// 判断标题是否合规
const validatorTitle  = (rule:any, value:any, callback:any) => {
  if (!value) {
    return callback(new Error("内容不能为空"));
  } else {
    setTimeout(() => {
      if (validateTitle(value)) {
        callback();
      } else {
        return callback(new Error('用户名格式不正确'))
      }
    }, 1000)
  }
};
// 判断文章是否合规
const validatorArticle  = (rule:any, value:any, callback:any) => {
  if (!value) {
    return callback(new Error("内容不能为空"));
  } else {
    setTimeout(() => {
      if (validateArticle(value)) {
        callback();
      } else {
        return callback(new Error('用户名格式不正确'))
      }
    }, 1000)
  }
};
const ruleForm = reactive<{
  title: string,
  article: string,
}>({
  title: '',
  article: '',
})

const rules = reactive({
  title:[{ validator: validatorTitle, trigger: 'blur' }],
  article:[{ validator: validatorArticle, trigger: 'blur' }],
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

      const params = {
        userId: user.userId,
        title: ruleForm.title,
        contentMarkdown: ruleForm.article,
      }
      publishArticle(params)
      console.log("发布成功");
      
      
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

<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    >
    <el-form-item label="标题" prop="title">
      <el-input
      v-model="ruleForm.title"
      maxlength="20"
      placeholder="请输入标题"
      show-word-limit
      type="text"
    />
    </el-form-item>
    
    <div style="margin: 20px 0" />
    <el-form-item label="文章内容" prop="article">
      <el-input
      v-model="ruleForm.article"
      maxlength="300"
      placeholder="文章内容"
      show-word-limit
      type="textarea"
      />
    </el-form-item>
    
    
    <!-- 提交 或 重置 -->
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Submit</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
    </el-form>

  
</template>


