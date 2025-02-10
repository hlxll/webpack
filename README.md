# 配置
输出文件使用format的cjs格式

# 调试
当前组件项目使用yarn build打包，然后使用yarn link输出链接。
在需要使用的项目中使用yarn link {name}  就能临时的实时使用。
# 安装
尽量使用--save-dev安装打包时候才使用的插件，运行时候不依赖的插件。
# 打包
使用--watch或-w可以查看打包时候的详细信息
# 发布
使用yarn publish，登录npm账号
# 内网上传
    重复发布会报错，可以修改version就可以了
# 问题
1：解决：在使用的时候，引入本组件和样式，
import 'supcon-ots-student/dist/main.css';
import {ChildRow, MainIndex} from 'supcon-ots-student'

# rollup插件
## 插件运行原理
多个插件是同步执行的，一个执行完才会执行下一个。
## 案例解读插件
查阅node_modules中的rollup-plugin-less源码，index.js文件。
导出一个默认的函数，例如rollup-plugin-less插件，导出一个plugin函数。
== transform ==
函数中可以定义许多钩子，其中主要的是transform钩子，可以拿到旧的数据，进行数据转换。例如这里的less转换
为css。转换是通过使用less插件，将less代码转换为css代码，然后保存在配置好的文件中，通过node的api操作文件。
== intro钩子 ==
这个是在buildStart之后，resolveId之前调用，在transform转换后，输出文件生成之前，通过这个钩子在文件插入自定义内容。
在这个插件中是插入一个函数，接受转换后的css为参数，创建一个style节点，将css插入到style标签中，并将style节点插入到dom中。这个打包后的组件被使用的时候，就会被执行，生成一个style。
