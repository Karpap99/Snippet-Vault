"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links: Record<string, string> = {
  Home: "/",
  Snippets: "/snippets",
};

export const Header = () => {
  const pathname = usePathname();

  const linkStyle = (path: string) => {
    return `relative inline-block px-2 py-1
      after:content-[''] after:absolute after:left-0 after:bottom-0
      after:h-[6px] after:w-full
      after:bg-gradient-to-t after:from-white after:to-transparent
      after:origin-bottom after:scale-y-0
      after:transition-transform after:duration-300
      hover:after:scale-y-100
      ${pathname === path ? "border-1 rounded-[2px]" : ""}`;
  };

  return (
    <header>
      <nav className="flex gap-5 justify-center items-center">
        {Object.entries(links).map(([label, path]) => (
          <Link key={path} href={path} className={linkStyle(path)}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
};