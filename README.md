# PublicRentalHousing-admin (公租房管理系统-2017)
> 请预先安装Node.js, npm, webpack

## 技术选型
* vueJs2.0 (前端基础框架)
* iView (前端UI框架)

### 安装依赖
```
$ npm install
```

### 启动服务
```
$ npm run dev
```
### 编辑打包
```
$ npm run build
```

### Response数据约定
```
$ response
{
	code: 1, // 1: 数据正常, 401: 未登录, 其他: 系统弹出全局错误提示
	data: {
		data: [{ // 具体数据
			name: apple,
			price: $1
		},{
			name: banana,
			price: $2
		}]
		page: { // 分页

		}
	},
	msg: '添加成功'
}
```
