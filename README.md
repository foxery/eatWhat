# eatwhat

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).  

# 首页：  
## 列表显示接口（按搜索关键词以及按分类显示列表接口）  
### 参数
> * kw //搜索关键值，不传则显示全部  
> * category //1-荤菜  2-素菜 3-半荤 4-汤  不传则显示全部    
### 返回值 (数组) 
> * img //封面图路径地址
> * category //1-荤菜  2-素菜 3-半荤 4-汤
> * categoryName //分类名称  
> * name //菜谱名称
> * ingredients //食材数组，包含食材名称和食材用量,格式例如[{name:"test",amount:"200g"}]
> * id //唯一标识符  

## 根据分类数量进行随机列表显示接口
根据分类数量返回相应数量的分类菜谱列表
### 参数
> * info //随机分类数组，包含分类id和分类数量
### 返回值 (数组) 
> * img //封面图路径地址
> * category //1-荤菜  2-素菜 3-半荤 4-汤
> * name //菜谱名称
> * ingredients //食材数组，包含食材名称和食材用量
> * id //唯一标识符    

## 创建菜谱接口  
### 参数
> * name //菜谱名称
> * img //封面图路径地址
> * category //1-荤菜  2-素菜 3-半荤 4-汤
> * ingredients //食材数组，包含食材名称和食材用量
> * step //做菜步骤详情,格式例如[{detail:"test",img:["/url1","/url2"]}]
> * remark //菜谱温馨提示文本

## 上传图片接口
需要配合小程序要求

## 获取详情接口
### 参数
> * id //菜谱标识符
### 返回值  
> * name //菜谱名称
> * img //封面图路径地址
> * category //1-荤菜  2-素菜 3-半荤 4-汤
> * ingredients //食材数组，包含食材名称和食材用量
> * step //做菜步骤详情,格式例如[{detail:"test",img:["/url1","/url2"]}]
> * remark //菜谱温馨提示文本

## 加入今日菜单接口
### 参数
> * ids //菜谱标识符集合，多个用,隔开

## 今日菜单列表接口
### 返回值 (数组)  
> * img //封面图路径地址
> * category //1-荤菜  2-素菜 3-半荤 4-汤
> * name //菜谱名称
> * ingredients //食材数组，包含食材名称和食材用量
> * id //唯一标识符 

## 删除今日菜单菜谱接口
### 参数
> * ids //菜谱标识符集合，多个用,隔开

## 今日菜单所需购买食材接口
### 返回值 (数组) 
> * ingredients //食材数组，包含食材名称和食材用量,格式例如[{name:"test",amount:"200g"}]  
  
  
> 注意，今日菜单删改会影响所要购买食材的数据