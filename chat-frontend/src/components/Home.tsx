import Image from "next/image";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        {/* Next.js ロゴ */}
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
          className="h-auto w-auto dark:invert"
        />

        {/* 手順リスト */}
        <ol className="list-inside list-decimal text-center text-sm font-mono sm:text-left">
          <li className="mb-2">
            Get started by editing
            <code className="mx-1 rounded bg-black/5 px-1 py-0.5 font-mono dark:bg-white/10">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        {/* CTA ボタン */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 items-center justify-center gap-2 rounded-full bg-foreground px-4 text-background transition-colors hover:bg-neutral-700 dark:hover:bg-neutral-300 sm:h-12 sm:px-5"
          >
            <Image
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
              className="h-auto w-auto dark:invert"
            />
            Deploy now
          </a>

          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-full items-center justify-center rounded-full border border-black/10 px-4 font-medium transition-colors hover:bg-neutral-100 dark:border-white/20 dark:hover:bg-neutral-900 sm:h-12 sm:w-auto sm:px-5 md:w-[158px]"
          >
            Read our docs
          </a>
        </div>
      </main>

      {/* フッターリンク */}
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6 text-sm">
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image src="/file.svg" alt="File icon" width={16} height={16} className="h-auto w-auto" aria-hidden />
          Learn
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image src="/window.svg" alt="Window icon" width={16} height={16} className="h-auto w-auto" aria-hidden />
          Examples
        </a>

        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image src="/globe.svg" alt="Globe icon" width={16} height={16} className="h-auto w-auto" aria-hidden />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}