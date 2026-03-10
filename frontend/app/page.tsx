export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans ">
      <main className="flex flex-col gap-20">
        <div>
          <h1 className="text-9xl">
            Snippet Vault
          </h1>
          <p className="text-2xl mx-[10]">
            Best way to create and manage your snippets
          </p>
        </div>
        
        <div className="flex justify-center">
          <button className="text-4xl py-[20] px-[40] border-2 rounded-xl">
            Try it out
          </button>
        </div>
        
      </main>
    </div>
  );
}
