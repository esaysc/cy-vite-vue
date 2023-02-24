<script setup lang="ts">
import { ref, watch, nextTick, shallowRef, onBeforeUnmount } from 'vue'
import { toRefs, defineProps } from 'vue'
import useHotStore from '@/store/modules/hot';
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router';

import '@wangeditor/editor/dist/css/style.css' // 引入 css
import '@/assets/style/css/view.css'
import '@/assets/style/css/layout.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IEditorConfig } from '@wangeditor/editor'
import { IToolbarConfig } from '@wangeditor/editor'
const props = defineProps({
  // 接收文章id
  articleId: Number,
 code: {
  type: String,
 default: `console.log('hello world);`,
  },
  type: {
 type: String,
  default: "js",
  },
  description: {
    type: String,
    default: "你好，世界！",
  },
});
let flag = ref(true);
watch(
  () => props.code,
  () => {
    flag.value = false;
    nextTick(() => {
    flag.value = true;
    });
  }
);



const hotStore = useHotStore()
const { ArticleAuthor,ArticleInfo } = storeToRefs(hotStore)
const router = useRoute()
const articleId = router.query.articleId
console.log("接收的文章ID:",articleId);
console.log("接收到的 ArticleInfo 中的文章ID:",ArticleInfo.value.articleId);

const { title,contentMarkdown} = ArticleInfo.value

const params = {
  articleId: articleId
}

const mode = 'default' // 或 'simple'
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

let valueHtml = ref(contentMarkdown)


// 模拟 ajax 异步获取内容
// onMounted(() => {
//     setTimeout(() => {
//         valueHtml.value = ''
//     }, 300)
// })

type InsertFnType = (url: string, alt: string, href: string) => void
const toolbarConfig: Partial<IToolbarConfig> = { 
}
toolbarConfig.insertKeys = {
  
    index: 32, // 插入的位置，基于当前的 toolbarKeys
    keys: ['btn','publish']
}

// 初始化 MENU_CONF 属性
const editorConfig: Partial<IEditorConfig> = {  // TS 语法
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
    
})

const handleCreated = (editor:any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  console.log('editor.getHtml()', editor.getHtml())
  editor.disable()
}
const handleChaged = (editor:any) => {
  console.log('editor.getHtml()', editor.getHtml())
}

</script>    

<template>
  <div style="border: 1px solid #ccc">
    <Editor
      style="height: 100%; overflow-y: hidden;"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChaged"
    />
  </div>
  
  <!-- <div class="formula-content">
  <preview-code v-if="flag" :code="code" :type="type"> </preview-code>
    <span class="description">{{ description }}</span>
  </div> -->

  
</template>

<style scoped>
  
</style>

