import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import axios from 'axios'
import { resolve } from 'path'
import path from 'path'
import { prismjsPlugin } from 'vite-plugin-prismjs'
vue.prototype.$http = axios // Axios绑定在Vue上面
// const { resolve } = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  plugins: [
    vue(),
    prismjsPlugin({
      languages: ['json', 'js'],
      //  languages: 'all',
      plugins: ['line-numbers'], //配置显示行号插件
      theme: 'solarizedlight', //主题名称
      css: true,
    }),
  ],
  // 代理访问
  server: {
    proxy: {
      '/api': {
        target: 'http://43.136.179.5:8049', //
        // target: 'http://localhost:8049',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // pathRewrite:{
        //   '^/api':''
        // }
      },
    },
  },

  // 起个别名，在引用资源时，可以用‘@/资源路径’直接访问
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      //define global scss variable
      scss: {
        additionalData: `@import "@/assets/style/sass/variables.scss";`,
      },
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(
            'src/assets/style/less/variables.less'
          )}";`,
        },
        javascriptEnabled: true,
        // 全局变量使用：@primary-color
      },
    },
  },
})
