## 开发任务

- [x] 安卓app端使用localstorage
- [x] 安卓app端优化快进方式   使用一个变量保存当前进度然后用另一个变量快进
- [x] 加入播放电影功能
- [ ] 安卓app加入观看历史功能
- [x] 安卓app优化设置页面
- [x] 增加上次观看的功能
- [ ] 加入转播电视台功能
- [ ] 组件化video、btn
- [ ] 完成设置功能 配置服务端地址、测试播放、清除缓存、恢复默认
- [ ] 继续观看跳转到上次的时间
- [ ] 删除lastView 改用history的第一个数据
- [ ] 想办法完成iptv页面
- [x] 修改APP图标及名称
- [x] 使用code-push线上更新
- [ ] 加入服务发现
## 好用的网站
- [安卓图标生成](https://makeappicon.com/) 
## code-push
appcenter
```
添加React-Native app
appcenter apps create -d opentv -o Android -p React-Native
appcenter apps create -d opentv -o iOS -p React-Native
添加环境
appcenter codepush deployment add -a gakkiox-outlook.com/opentv Staging
appcenter codepush deployment add -a gakkiox-outlook.com/opentv Production
查看环境
appcenter codepush deployment list -k -a gakkiox-outlook.com/opentv
上传更新到Production
appcenter codepush release-react -a gakkiox-outlook.com/opentv -d Production
```

