<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {toRefs} from 'vue'
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IEditorConfig } from '@wangeditor/editor'
import COS from 'cos-js-sdk-v5';
import useLoginStore from '@/store/modules/login'
import useCos from '@/utils/cosPublic'
import { IToolbarConfig } from '@wangeditor/editor'

import { IButtonMenu, IDomEditor } from '@wangeditor/editor'
import { DomEditor } from '@wangeditor/editor'
import { Boot, IModuleConf } from '@wangeditor/editor'
import usePublish from '@/store/modules/publish'
import { ElMessage, ElMessageBox } from 'element-plus'
const loginStore = useLoginStore()
const {userInfo} = loginStore
const publishStore =  usePublish()
const {setFlag,setText,publish} = publishStore
// const text = toRefs(publishStore) 
const {text,flag} = (publishStore) 
if(!flag){
  // 临时保存数据
  class MyButtonMenu implements IButtonMenu {   // TS 语法

      constructor() {
          this.title = '保存' // 自定义菜单标题
          // this.iconSvg = '<svg>...</svg>' // 可选
          this.tag = 'button'
      }
      title: string;
      iconSvg?: string | undefined;
      hotkey?: string | undefined;
      alwaysEnable?: boolean | undefined;
      tag: string;
      width?: number | undefined;
      // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
      getValue(editor: IDomEditor): string | boolean {   // TS 语法
          return ' hello '
      }
      // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
      isActive(editor: IDomEditor): boolean {  // TS 语法
          return false
      }

      // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
      isDisabled(editor: IDomEditor): boolean {   // TS 语法
          return false
      }

      // 点击菜单时触发的函数
      exec(editor: IDomEditor, value: string | boolean) {   // TS 语法
          if (this.isDisabled(editor)) return
          console.log('点击事件',editor.getHtml())
          
          setText(editor.getHtml())
      }

  }
  // 上传作品
  class MyButtonMenu2 implements IButtonMenu {   // TS 语法

  constructor() {
      this.title = '发布' // 自定义菜单标题
      // this.iconSvg = '<svg>...</svg>' // 可选
      this.tag = 'button'
  }
  title: string;
  iconSvg?: string | undefined;
  hotkey?: string | undefined;
  alwaysEnable?: boolean | undefined;
  tag: string;
  width?: number | undefined;
  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  getValue(editor: IDomEditor): string | boolean {   // TS 语法
      return ' hello '
  }
  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive(editor: IDomEditor): boolean {  // TS 语法
      return false
  }

  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled(editor: IDomEditor): boolean {   // TS 语法
      return false
  }

  // 点击菜单时触发的函数
  exec(editor: IDomEditor, value: string | boolean) {   // TS 语法
      if (this.isDisabled(editor)) return
      let contentMarkdown = editor.getHtml()
      console.log('contentMarkdown', contentMarkdown)

      ElMessageBox.prompt('请输入作品名称', 'Tip', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      inputPattern:/\S{1,20}$/,
      inputErrorMessage: '无效的名称',
    })
      .then(({ value }) => {
        ElMessage({
          type: 'success',
          message: `你的作品: ${value}`,
        })

        console.log('value', value)
        // 请求上传
        const params = {
          userId: userInfo.data.userId,
          title: value,
          contentMarkdown: contentMarkdown
        }
        publish(params)

      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消发布',
        })
      })

      
  }

  }
  const menu1Conf = {
    key: 'saveBtn', // 定义 menu key ：要保证唯一、不重复（重要）
    factory() {
      return new MyButtonMenu() // 把 `YourMenuClass` 替换为你菜单的 class
    },
  }
  const menu1Conf2 = {
    key: 'publish', // 定义 menu key ：要保证唯一、不重复（重要）
    factory() {
      return new MyButtonMenu2() // 把 `YourMenuClass` 替换为你菜单的 class
    },
  }

  const module: Partial<IModuleConf> = {   // TS 语法
    menus: [menu1Conf, menu1Conf2],
    // 其他功能，下文讲解...
  }
  Boot.registerModule(module)
  setFlag(true)
}



var Bucket = 'cy-public-1314976122';  /* 存储桶，必须字段 */
var Region = 'ap-chengdu';     /* 存储桶所在地域，必须字段 */
// 目录为 type/username/filename
var directory = ''
var filename = ''
var type = 'article'

var cos = new COS({})

const mode = 'default' // 或 'simple'
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

let valueHtml = ref('')



// 模拟 ajax 异步获取内容
// onMounted(() => {
//     setTimeout(() => {
//         valueHtml.value = ''
//     }, 300)
// })

type InsertFnType = (url: string, alt: string, href: string) => void
const toolbarConfig: Partial<IToolbarConfig> = { 
}
// 内容 HTML
if(text!=null){
  valueHtml = ref(text)
}
toolbarConfig.insertKeys = {
    index: 32, // 插入的位置，基于当前的 toolbarKeys
    keys: ['saveBtn','publish']
}

// 初始化 MENU_CONF 属性
const editorConfig: Partial<IEditorConfig> = {  // TS 语法
    MENU_CONF: {
      'uploadImage' : {
        // 自定义上传
        async customUpload(file: File, insertFn: InsertFnType) {  // TS 语法
          // file 即选中的文件
          // 自己实现上传，并得到图片 url alt href
          filename = file.name
          // 拼接文件存放目录
          directory = useCos.dateDirectory(type,userInfo.data.username,filename)
          console.log('directory:', directory)
          cos = useCos.createCos(Bucket,directory)
          const location = useCos.handleFileInUploading(Bucket,Region,directory,file)

          // 最后插入图片
          location.then((res)=>{
            insertFn("http://"+res, "test", '')
          })
        },
      },
    }
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
}
const handleChaged = (editor:any) => {
  console.log('editor.getHtml()', editor.getHtml())
}

</script>    

<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden;"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChaged"
    />
  </div>
  
</template>

<style scoped>
  
</style>
