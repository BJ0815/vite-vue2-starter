# @/router/

定義專案頁面的路由配置

## 目錄結構

```
├── ...
└── src
    ├── router
    │   └── index.js
    └── ...
```

## 預渲染配置
Vue Router 新增路由後，也須在 `vue.config.js` 新增 Prerender-SPA-Plugin 所需渲染的路由配置。

```javascript
// router/index.js

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
  // ...
]
```

```javascript
// vue.config.js

// line: 64
const renderRoutes = [
  '/',
  '/about'
]
```
