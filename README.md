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
    externals
    dll
优化代码运行的性能
    缓存（hash，chunkhash，contenthash）
    tree shaking(必须是es6模块，如果使用webpack的生产模式，自动启动)
    code split
        单入口（打包分割成多个js文件）
        多入口（）
    懒加载/预加载
    pwa
    
