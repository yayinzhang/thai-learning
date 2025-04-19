# Thai Learning Website (泰語學習網站)

這是一個透過 AI 協助開發的泰語學習網站，提供以下功能：

- 📰 **泰文新聞閱讀與翻譯**：自動將泰文文章翻譯為繁體中文
- 🧠 **單字表整理**：每篇文章自動擷取泰文單字＋詞性＋中文意思
- ✏️ **句型與文法解析**：針對泰文語法自動產出教學說明與例句
- 💬 **中泰對照頁面**：閱讀泰文時可以同步參考中文翻譯與教學內容
- 🔐 **後台管理**：由管理者貼上新聞連結，自動生成教學內容並上架
- ☁️ **Git 自動備份與推送系統**：使用 `thai-save` 指令一鍵 commit + push

---

## 🚀 使用技術

- Next.js + Tailwind CSS
- TypeScript 型別管理
- LocalStorage（準備串 Supabase）
- OpenAI GPT-4 API（AI 分析教學內容）
- Git + GitHub 自動化備份流程

---

## 📌 目前進度

- [x] 建立網站框架
- [x] 完成 AI 教學內容生成流程
- [x] 設定 Git 自動化指令 `git-backup-and-push`
- [x] 上傳 GitHub 並加上 README
- [ ] 串接 Supabase 做資料庫儲存
- [ ] 設計會員系統與學習紀錄

---

## 🧑‍💻 製作人員

- 張雅茵（Yayin Zhang）— 開發者 & 產品設計

---