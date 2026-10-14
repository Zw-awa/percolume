# Percolume · 渗行

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-TW.md)

**Small efforts find a path.**

渗行是一個安靜的桌面小工具，用來讓微小的努力變得可見。記錄一次進步，目標網格中就會隨機亮起一個格子。隨著累積，分散的點可能連接成一條從頂部通到底部的路徑。

## 功能

- 用每日貢獻區域記錄努力。
- 每次記錄隨機點亮目標網格中的一個格子。
- 每個格子可以保存點亮時間和一句話。
- 當進度形成四方向連通路徑時，將路徑可視化。
- 資料保存在本地，不需要帳號。
- 適合日常使用的安靜、低干擾介面。

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

渗行將進度記錄保存在你的裝置上。應用不會把句子和時間記錄發送到託管服務。

## 參與貢獻

請閱讀 [CONTRIBUTING.zh-TW.md](./CONTRIBUTING.zh-TW.md)。

## 授權條款

MIT，詳見 [LICENSE](./LICENSE)。
