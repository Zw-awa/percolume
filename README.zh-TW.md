# Percolume · 渗行

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-TW.md)

**Small efforts find a path.**

渗行是一個安靜的桌面小工具，用來讓微小的努力變得可見。記錄一次進步，目標網格中就會隨機亮起一個格子。隨著累積，分散的點可能連接成一條從頂部通到底部的路徑。

## 功能

- 用每日貢獻區域記錄努力。
- 每次記錄隨機點亮目標網格中的一個格子。
- 將滑鼠移到每日格子時查看日期和當天記錄次數。
- 用清晰的網格展示長期累積的進度。
- 資料保存在本地，不需要帳號。
- 適合日常使用的安靜、低干擾介面。

## 使用渗行

1. 點擊 **記錄今天**，增加一次記錄並點亮一個格子。
2. 使用 **編輯目標** 修改目標名稱或網格大小。
3. 將滑鼠移到每日格子上，查看日期和當天記錄次數。
4. 點擊已點亮的目標格子查看它，或使用 **重新洗牌** 清空目前的網格分布。

網頁原型支援 4x4 到 14x14 的網格。空格子會保留給後續記錄，目前累計資料會自動保存在瀏覽器中。

## 開始使用

```bash
cd apps/percolume/frontend
npm install
npm run dev
```

建立生產版本：

```bash
npm run build
```

## 倉庫

應用位於 [`apps/percolume/frontend`](./apps/percolume/frontend)。GitHub 社群檔案位於 [`.github`](./.github)。

## 隱私

渗行使用瀏覽器本地儲存，將進度記錄保存在你的裝置上。網頁應用不會把進度發送到託管服務。清除網站資料或更換瀏覽器設定檔會刪除本地記錄。

## 參與貢獻

請閱讀 [CONTRIBUTING.zh-TW.md](./CONTRIBUTING.zh-TW.md)。

## 授權條款

MIT，詳見 [LICENSE](./LICENSE)。
