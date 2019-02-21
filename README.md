## Install

Using npm:
```
npm install gq-plus --save

import areaGq from 'gq-plus';
Vue.use(areaGq);

```

## Usage

根据地区码获取地区中文:
```
this.$Area.getTextByCode(code)

```

## Usage

```vue
<template>
    <areaSelect @on-change="onChange" />
</template>
<script>
    export default {
        data () {
            return {}
        },
        methods: {
        	//地区选择事件回调
        	onChange(area){
        		//area 是个对象 code: 地区编码, label: 地区中文，数组
        		console.log(area)
        	},
            //根据code返回省市县数据
            getTextByCode(){
                let text = this.$Area.getTextByCode("110101")
                //text 返回值 北京市-市辖区-东城区
            }
        }
    }
</script>
```

## API AreaSelect
## props
属性|说明|类型|默认值
:-------: | -------  |  :-------:  |  :-------:
value |  地区code编码, 6位数字  |String, Number |  -
disabled |  设置为禁止选择状态  |Boolean |  false
labelWidth |  省/市/县 输入框默认宽度  |Number |  145
level |  要显示的级别，如设为2则显示省、市和县，即3级，级别可设为0、1、2  |Number |  2

## events
事件名|说明|返回值|返回值参数说明
:-------: | -------  |  :-------:  |  :-------:
on-change |  选择地区时触发  |Objece{ code, label } | code: 地区编码, label: 地区中文，数组

Copyright (c) 2019-01-16, 32237384@qq.com
