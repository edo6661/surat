import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { getCurrentUser } from "@/services/user";

const Header = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <header>
        <nav className="container">
          <div className="flex items-center justify-between">
            <Link href="/">Home</Link>
            <Link href="/pdfmake">pdfmake</Link>
            <div className="fl-ic gap-4">
              <SignedIn>
                {user?.role === "APPLICANT" && (
                  <Link href="/create-letter">Create Letter</Link>
                )}
                <Link href="/letters">Letters</Link>
                {
                  user?.role === "SUBDISTRICT" && (
                    <Link href="/users">Users</Link>
                  )
                }
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <Button asChild variant="secondary">
                  <Link href="/sign-in">Sign in</Link>
                </Button>
              </SignedOut>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
