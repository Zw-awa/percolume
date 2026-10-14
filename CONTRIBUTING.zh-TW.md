# 參與貢獻

感謝你幫助改進渗行。你可以貢獻錯誤修復、文件改進、無障礙優化、翻譯、測試，以及桌面體驗相關的修改。

## 開始之前

請先搜尋已有的 Issue 和 Pull Request。較大的修改請在編寫程式碼前先提交 Issue，公開討論問題和預期行為。

請不要在 Issue、Pull Request、截圖或測試資料中包含私人進度句子、本地資料匯出檔案或其他個人資訊。

## 本地開發

目前應用位於 `apps/percolume/frontend`，使用 Node.js 和 Vite。

```bash
cd apps/percolume/frontend
npm install
npm run dev
```

在瀏覽器中開啟 Vite 輸出的本地網址。

## 驗證修改

提交 Pull Request 前請執行生產建置：

```bash
npm run build
```

涉及行為變化時，請在 Pull Request 中說明手動驗證步驟。某個模組已有測試時，新測試應放在對應模組附近。

## Pull Request

每個 Pull Request 盡量只處理一個變化。請說明面向使用者的結果，關聯對應 Issue；視覺修改可以附截圖或簡短錄影。

提交訊息請清晰描述修改，例如：

```text
fix(grid): preserve cell details after reshuffling
```

審查會關注正確性、清晰度、無障礙、隱私和現有介面的一致性。

## 回報錯誤

請使用 Bug 回報範本，並提供渗行版本、作業系統、重現步驟、預期行為和實際行為。上傳檔案前請移除私人句子和本地資料。

## 授權條款

提交貢獻即表示你同意該貢獻遵循倉庫的 [MIT 授權條款](./LICENSE)。
