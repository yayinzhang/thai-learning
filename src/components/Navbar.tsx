'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'bg-indigo-700' : '';
  };

  return (
    <nav className="bg-[#F7E7CE] text-gray-700 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold hover:text-gray-900">
            泰語學習
          </Link>

          <div className="flex space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-[#F2D4A7] ${
                isActive('/') ? 'bg-[#F2D4A7]' : ''
              }`}
            >
              首頁
            </Link>
            <Link
              href="/vocab"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-[#F2D4A7] ${
                isActive('/vocab') ? 'bg-[#F2D4A7]' : ''
              }`}
            >
              單字庫
            </Link>
            <Link
              href="/grammar"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-[#F2D4A7] ${
                isActive('/grammar') ? 'bg-[#F2D4A7]' : ''
              }`}
            >
              文法庫
            </Link>
            <Link
              href="/admin"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-[#F2D4A7] ${
                isActive('/admin') ? 'bg-[#F2D4A7]' : ''
              }`}
            >
              管理後台
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 