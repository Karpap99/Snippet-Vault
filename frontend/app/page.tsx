import { SnippetGrid } from "./_components/snippetsGrid/snippetGrid";

export default function Home() {
  return (
    <div className="flex m-auto font-sans min-w-full">
      <main className="flex flex-col gap-20 min-w-full">
        <SnippetGrid/>
      </main>
    </div>
  );
}
