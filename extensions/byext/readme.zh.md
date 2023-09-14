# byext

cocos creator 插件

## 功能

- 把raw-assets目录的文件原样复制到生成的项目内  (android/assets等目录)
- 修改settings.json，将bos/qsdk加入到preloadBundles内
- //生成热更新需要用到的manifest，将热更新资源复制到remote-assets目录内
- 在build/android/proj/godsdk_plugin.json建立链接，链接到native/engine/android/godsdk_plugin.json
- 在gradle.properties在添加android.enableJetifier=true
- rfs server

## 编译

```
npm i
npm run build
```