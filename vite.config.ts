import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// 需要读取环境变量，所以函数形式，返回defineConfig配置，在函数里拿到环境变量
export default ({ mode }) => {

  const env = loadEnv(mode, process.cwd());   // 获取.env文件里定义的环境变量

  return defineConfig({
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src') // 路径别名
      }
    },
    server: {
      host: 'localhost',
      port: Number(env.VITE_APP_PORT),
      open: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'https://api.youlai.tech',
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        }
      }
    }
  })
}
