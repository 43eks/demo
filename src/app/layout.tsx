import "@/app/globals.css";
import type { ReactNode } from "react";

export const metadata = { title: "Chat UI" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-1 flex justify-center items-start p-4">
          {children}
        </main>
      </body>
    </html>
  );
}