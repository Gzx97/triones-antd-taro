import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import dts from "vite-plugin-dts"
import atImport from 'postcss-import'
import * as path from "node:path";


export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(process.cwd(), './src')
        }
    },
    plugins: [
        react(),
        dts({outDir: 'es', exclude: ['src/**/style/**']}),
        dts({outDir: 'lib', exclude: ['src/**/style/**']}),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                charset: false,
                // additionalData: `@import "/src/button/style/style.scss";`,
                // additionalData: `@import "./src/style/index.scss";`,
            },
        },
        postcss: {
            plugins: [
                atImport({path: path.resolve(process.cwd(),'./src')})
            ]
        }
    },
    build: {
        target: 'modules',
        emptyOutDir: false,
        lib: {
            entry: ['./src/index.tsx','./src/style/index.scss'],
            name: 'antd-taro-react',
            fileName: 'index',
            // fileName: (format) => `index.${format}.js`,
            // formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-dev-runtime',
                'react/jsx-runtime',
                '@tarojs/react',
                '@tarojs/runtime',
                '@tarojs/taro',
                '@tarojs/components'
            ],
            output: [
                {
                    // format: 'cjs',
                    entryFileNames: '[name].js',
                    plugins: []
                }, //默认配置，打包到dist 文件夹下
                {
                    format: 'es',
                    dir: 'es',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    banner: '/** TrionesDev  **/',
                },
                {
                    format: 'cjs',
                    dir: 'lib',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                }
            ]
        },
    },
})
