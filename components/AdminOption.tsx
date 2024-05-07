"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Role, User } from "@prisma/client"
import Link from "next/link"
import { Button } from "./ui/button"
interface AdminOptionProps {
  role: Role;
}
const AdminOption = (
  { role }: AdminOptionProps
) => {
  return (
    <DropdownMenu>

      <DropdownMenuTrigger className=" bg-secondaryBg px-4 py-2 rounded-2xl">
        Options
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Feature</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignedIn>
            {role === "APPLICANT" && (
              <Link href="/create-letter">Create Letter</Link>
            )}
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">Sign in</Link>
          </SignedOut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SignedIn>
            <Link href="/letters">Letters</Link>

          </SignedIn>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <SignedIn>
            {role === "SUBDISTRICT" && (
              <Link href="/users">Users</Link>
            )}
          </SignedIn>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default AdminOption