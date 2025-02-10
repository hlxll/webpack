# 配置
输出文件使用format的cjs格式

# 调试
当前组件项目使用yarn build打包，然后使用yarn link输出链接。
在需要使用的项目中使用yarn link {name}  就能临时的实时使用。
# 安装
尽量使用--save-dev安装打包时候才使用的插件，运行时候不依赖的插件。
# 发布
使用yarn publish，登录npm账号
# 内网上传
    重复发布会报错，可以修改version就可以了
# 问题
1：解决：在使用的时候，引入本组件和样式，
import 'supcon-ots-student/dist/main.css';
import {ChildRow, MainIndex} from 'supcon-ots-student'
