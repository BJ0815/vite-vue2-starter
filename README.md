# 整招專案 MKT-2021

本專案建議使用 devcontainer 環境開發  
請參考 [devcontainer 開發環境設定](https://github.com/104corp/104z-doc/wiki/devcontainer-%E9%96%8B%E7%99%BC%E7%92%B0%E5%A2%83%E8%A8%AD%E5%AE%9A)

## [104_20210718](https://kad.events.104-dev.com.tw/104_20210718/)
### 需求記錄
- 2021/7/18 - [ZT-test](http://jira.104.com.tw/browse/ZT-test)

## Case: 新建專案

### Step1: 建立分支  
  
**使用公司名做分類，以 `/` 隔開公司與專案名稱 `公司名/專案名`**  
專案名稱統一由開案日期(年月日8位數)開頭，視情況在後面加上 `專案類型` 後綴 以 `_` 隔開  
e.g. `tutorabc/20210527_cpl`

> Note: 一律使用小寫英數字

### Step2: 建立專案

1. 進入分支後，command line 執行 `sh .template/init.sh`
2. 依照指示input對應資訊
3. 等待安裝完畢即可開始開發

> Note: 若無法順利執行shell script請改用 `sudo sh .template/init.sh`

## Case: 維運專案  

### Step1: 重整環境
切換分支開啟專案後須執行 `npm run reset`，以整頓資料夾 & 安裝此專案的依賴

### Step2: 記錄需求
依照上方 [需求記錄](#需求記錄) 的格式記下本次維運需求的 `jira單號`

## 開發指令

### Pre-Development
- **建立專案**
```
sh .template/init.sh
```

- **重整環境**
```
npm run reset
```

### Development
```
npm run serve
```

### Production
```
npm run build
```
