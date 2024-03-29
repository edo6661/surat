import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <>
      <header>
        <nav className="container">
          <div className="flex items-center justify-between">
            <Link href="/">Home</Link>
            <Link href="/pdfmake">pdfmake</Link>
            <div className="fl-ic gap-4">
              <SignedIn>
                <div className="fl-ic gap-4">
                  <Link href="/create-letter">Create Letter</Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
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
