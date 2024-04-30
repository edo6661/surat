"use server";

import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const changeRole = async (id: string, role: Role) => {
  try {
    const users = await db.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });
    revalidatePath("/users");
    return users;
  } catch (err) {
    console.error(err);
  }
};
