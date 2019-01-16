## Install

Using npm:
```
npm install gq-plus --save

import areaGq from '../src/index';
Vue.use(areaGq);

```

Using a script tag for global use:

```html
//项目主入口引入组件
import areaGq from '../src/index';
Vue.use(areaGq);
```

You can find more info [on the website](https://www.iviewui.com/docs/guide/install-en).

## Usage

```vue
<template>
    <AreaSelect />
</template>
<script>
    export default {
        data () {
            return {}
        }
    }
</script>
```

## API
## AreaSelect props
|属性|说明|类型|默认值|
|---|---|---|---|
|value |  地区code码, 6位数字  |String, Number |  -  |
|disabled |  设置为禁止选择状态  |Boolean |  false  |
|labelWidth |  省/市/县 输入框默认宽度  |Number |  145 |

Copyright (c) 2019-01-16, 32237384@qq.com
