# @/assets/

存放專案所需的靜態檔案 e.g. images, styles

## 目錄結構
```
.
├── ...
└── src
    ├── assets
    │   ├── img
    │   └── style
    │       ├── abstract      # 不產生樣式的scss文件 - 變數、mixin等
    │       ├── animation
    │       └── base          # reset、font-face及定義整體樣式的文件
    └── ...
```

## Built-In SCSS Tool
 本專案有預設常用 SCSS @function, @mixin 方便開發

### Color
`style/abstract/_color.scss`  
- `$colors` 定義顏色
- `color(變數名稱)` 取用顏色
  
```scss
color: color(black);          // color: #000;
```
```scss
color: color(gray, 100);      // color: #F3F3F3;
```

### Breakpoints
`style/abstract/_breakpoints.scss`

- `$breakpoints` 定義斷點
- `$type` 定義變版的 Media Queries
  - desktop-first `@media (max-width: 768px)`
  - mobile-first `@media (min-width: 768px)`

```scss
// xxl | xl | lg | md | sm

@include screen (md) {
  // @content
}

@include screen (md, min) {
  // @content
}

@include screen (md, max) {
  // @content
}

@include screen (md, between, lg) {
  // @content
}
```

### Other Utils

#### `text-overflow` 文字溢出省略  
可傳參數 `$line` 指定行數

```scss
@include text-overflow(2);
```

#### `support-ie` 在 IE 的環境下套用定義的樣式

```scss
@include support-ie {
  // ...
}
```