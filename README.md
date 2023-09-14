# 266大厅工程

## 运行须知
* 配置好 gitlab 的 ssh key([点我查看教程](https://code.266.com/help/ssh/README#generating-a-new-ssh-key-pair))
* 子模块初始化 git submodule update --init
* 进入tools目录链接协议文件， mac用户运行linkProto.sh，windows用户用管理员身份运行linkProto.bat
* 需要打bundle的包只能在assets目录下，app业务模块放在app/modules。app除modules目录以外不可以打成bundle，公共资源放在resources目录

## 项目结构
* assets/app
    大厅业务模块
* assets/bos
    bos框架代码
* assets/qsdk
    qsdk业务代码
* resources/proto
    通信协议文件


## 代码规范
* [Typescript 代码规约](https://jmfe.gitee.io/jm-fe/standard/cli/tslint.html#typescript-%E4%BB%A3%E7%A0%81%E8%A7%84%E7%BA%A6)

## 协议生成
* 定义环境变量 IDLPATH 指向自己本地协议路径
* 在idl/idl.yaml文件上加入自己需要的proto文件
* 运行工具idl-tskit-mac/win