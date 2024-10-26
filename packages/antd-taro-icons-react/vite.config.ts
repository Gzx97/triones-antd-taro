import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [react(), dts()],
    build: {
        cssCodeSplit: false,
        lib: {
            entry: './src/index.tsx',
            name: 'antd-taro-icons-react',
            fileName: 'index'
        },
        rollupOptions: {
            plugins: [],
            external: ['react',
                'react-dom',
                'react/jsx-dev-runtime',
                'react/jsx-runtime'],
            output: [
                {
                    format: 'umd',
                    entryFileNames: '[name].js',
                    name: 'index.umd.js'
                }, //默认配置，打包到dist 文件夹下
                {
                    format: 'es',
                    dir: 'es',
                    entryFileNames: '[name].es.js',
                    assetFileNames: '[name].[ext]',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                },
                {
                    format: 'cjs',
                    dir: 'lib',
                    entryFileNames: '[name].cjs',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                }
            ]
        },
    },
})
