# React Native 《炉石传说》查卡App

<img src='https://cdn.rawgit.com/zhw2590582/RNHearthstone/master/app01.gif' width='300px'>

## 主要技术栈

* [react-native](https://github.com/facebook/react-native) - 底层APP框架
* [react-redux](https://github.com/reactjs/react-redux) - 组件间通信
* [redux-saga](https://github.com/redux-saga/redux-saga#readme) - 异步操作
* [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch/issues) - 网络请求
* [redux-logger](https://github.com/evgenyrodionov/redux-logger#readme) - 调试中间件
* [hearthstoneapi](http://hearthstoneapi.com/) - 炉石传说API来源

## 开始运行

```sh
$ npm install
$ react-native link
$ react-native run-ios
```
## 注意事项
* 只在 IPhone SE 上调试完成，其它机型兼容性尚未测试
* UI素材均来自炉石传说
* API请求有每日限制数目
