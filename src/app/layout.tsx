import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '泰語學習',
  description: '泰語學習平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body>
        <nav className="nav-bar">
          <div className="nav-container">
            <a href="/" className="nav-logo">泰語學習</a>
            <div className="nav-links">
              <a href="/" className="nav-link">首頁</a>
              <a href="/grammar" className="nav-link">文法庫</a>
              <a href="/vocab" className="nav-link">單字庫</a>
              <a href="/admin" className="nav-link">管理</a>
            </div>
          </div>
        </nav>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  )
}
