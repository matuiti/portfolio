import Link from "next/link";

export default function Home2() {
  return (
      <div className="flex flex-col mt-8 p-5 items-center justify-center bg-zinc-50 font-sans gap-8">
        <h1>以下から各ページへ飛べます</h1>
        <main className="flex w-full max-w-3xl flex-col items-center gap-6">
          <Link href="./works/">WORKSページへ</Link>
          <Link href="./skills/">SKILLSページへ</Link>
          <Link href="./gallery/">GALLERYページへ</Link>
        </main>
      </div>
  );
}
