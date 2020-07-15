## koa-elasticsearch
利用Koa框架实现的elasticsearch搜索存储脚手架项目

### 项目描述
该项目主要利用Node服务作为中间层，通过Node服务去采集整理elasticsearch存储引擎的数据，然后提供相应接口给前端人员；接口文档采用YAPI服务整理；

### 项目技术栈
使用Koa框架实现

### 项目依赖
```javascript
{
    "elasticsearch": "^16.7.1",
    "koa": "^2.11.0",
    "koa-bodyparser": "^4.3.0",
    "koa-router": "^8.0.8",
    "log4js": "^6.2.0"
}
```