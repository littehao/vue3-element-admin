import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path'
import fs from 'fs'
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import viteCompression from 'vite-plugin-compression'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const optimizeDepsElementPlusIncludes = ["element-plus/es"];
fs.readdirSync("node_modules/element-plus/es/components").map((dirname) => {
  fs.access(
      `node_modules/element-plus/es/components/${dirname}/style/css.mjs`,
      (err) => {
          if (!err) {
              optimizeDepsElementPlusIncludes.push(
                  `element-plus/es/components/${dirname}/style/css`
              );
          }
      }
  );
});
export default defineConfig({
	base: './',
	resolve: {
    alias: {
      '@':  resolve(__dirname, 'src')
    }
  },
	plugins: [
		vue(),
		VueSetupExtend(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		}),
		viteCompression({
				deleteOriginFile:false,
				verbose: true, // 输出压缩成功
				disable: false, // 是否禁用
				threshold: 10240, // 体积大于阈值会被压缩，单位是b
				algorithm: 'gzip', // 压缩算法
				ext: '.gz',// 生成的压缩包后缀
		})
	],
	build: {
			chunkSizeWarningLimit: 500,
			emptyOutDir: true, // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
			rollupOptions: {
					output: {
							chunkFileNames: 'static/js/[name]-[hash].js',
							entryFileNames: 'static/js/[name]-[hash].js',
							assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
							manualChunks(id) { //静态资源分拆打包
									if (id.includes('node_modules')) {
											return id.toString().split('node_modules/')[1].split('/')[0].toString();
									}
							}
					}
			},
			minify: 'terser',
			terserOptions: {
					compress: {
							drop_console: true,
							drop_debugger: true,
					},
			},
 },
	optimizeDeps: {
		include: optimizeDepsElementPlusIncludes
	},
	// 反向代理
		server: {
				host: '0.0.0.0', //服务器ip地址
				port: 4000, //本地端口
				fs: {
						strict: false, //  支持引用除入口目录的文件
				},
				open: false, // 是否自动在浏览器打开
		}
});
