# webpack性能优化
开发环境优化

生产环境优化
## 开发环境性能优化
优化打包构建速度
    HMR
优化代码调试
    source-map

## 生产环境性能优化
优化打包构建速度
    oneOf
    babel缓存
    多进程打包
    externals:打包忽略模块设置
    dll
优化代码运行的性能
    缓存（hash，chunkhash，contenthash）
    tree shaking(必须是es6模块，如果使用webpack的生产模式，自动启动)
    code split
        单入口（打包分割成多个js文件）
        多入口（）
    懒加载/预加载
    pwa
# plugin和optimization区别
Plugins 是增强 Webpack 功能的工具，提供广泛的功能扩展。
Optimization 是一个配置项，专注于提高构建结果的性能和效率。
简单来说，plugins 更加灵活和广泛，适用于多种不同的操作。
而 optimization 则是一个特定的目的，主要用于提升最终构建输出的性能和质量。
虽然都是插件，但是专注优化的是放在optimization中，而偏向资源处理，也可以有优化功能的，是在plugins中配置。
增强可读性，可扩展性。
# 插件tapable的钩子原理
钩子有同步，异步（串行，并行）的。
1：同步的钩子，是按照注册顺序执行的。如果注册的钩子有before等字段，可以配置钩子的指定顺序。通过算法将钩子放在指定位置。
2：异步的钩子，有串行和并行的钩子，

