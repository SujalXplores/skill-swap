"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { UserNav } from "./user-nav";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl">
          SkillSwap
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/skills"
            className="text-muted-foreground hover:text-foreground"
          >
            Browse Skills
          </Link>
          <ThemeToggle />
          {session ? (
            <UserNav />
          ) : (
            <div className="flex gap-4">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
