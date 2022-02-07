
# babel-plugin-tracer

## 安装
```
yarn add babel-plugin-tracer -D
```

## babel.config.js
```js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
      ["babel-plugin-tracer", {
        "cssPath": "tracer-ui/lib/style/{key}.css",
        "jsPath": "tracer-ui/lib/Tracer.es.js",
        "lib": "tracer-ui" 
    }]
  ]
}
```
## 按需引入
只需要在main.js里引入对应的组件即可
```js

import { createApp } from 'vue'
import App from './App.vue'
import {Button} from 'tracer-ui'
createApp(App).use(Button).mount('#app')
```

