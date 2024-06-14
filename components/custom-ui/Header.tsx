import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { getCurrentUser } from "@/services/user";
import Image from "next/image";
import { Heading } from "./heading";
import HeaderItems from "../HeaderItems";
import AdminOption from "../AdminOption";

const Header = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <header className=" bg-primaryBg py-4 text-white">
        <nav className="container">
          <div className="flex items-center justify-between">
            <div className="max-w-[320px]">
              <Link href="/" className=" fl-ic gap-4">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={60}
                  height={60}
                />
                <Heading className="text-lg leading-5">
                  Kecamatan Jatiuwung Kota Tangerang
                </Heading>
              </Link>
            </div>
            <HeaderItems />
            <div className="fl-ic gap-4">
              <AdminOption
                role={user?.role!}
              />
              <UserButton afterSignOutUrl="/" />
            </div>


            {/* <div className="fl-ic gap-4">
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
            </div> */}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
