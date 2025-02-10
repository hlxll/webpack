import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import livereload from 'rollup-plugin-livereload';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import svgr from '@svgr/rollup';
// import postcss from 'rollup-plugin-postcss';
import less from 'rollup-plugin-less';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/main.js',
        format: 'cjs',
        name: 'HlComponent',
        sourcemap: true,
        globals: {
            jquery: '$'
        }//使用external排除的文件，如果在本项目中使用的就需要给一个全局变量了，比如jquery的$
    },
    external: ['react', 'react-dom', 'antd', 'jquery'],
    plugins: [
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            presets: ['@babel/preset-react'],
        }),
        less({ // 处理 LESS
            output: 'dist/main.css', // 输出你需要的 CSS 文件
            insert: true, // 将生成的 CSS 自动插入页面,
            include: ['**/*.less', '**/*.css']
        }),
        // postcss({
        //     extract: true, // 提取样式到单独文件
        //     minimize: true, // 压缩 CSS
        //     sourceMap: true, // 允许生成 sourcemap
        //     plugins: [require('autoprefixer')]//处理样式
        // }),
        terser(),
        livereload(),
        image(),
        svgr(),
    ],
};
