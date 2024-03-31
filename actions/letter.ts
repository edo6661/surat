"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteLetterWithId = async (id: string) => {
  try {
    await db.letter.delete({
      where: {
        id,
      },
    });
    revalidatePath("/letters");
  } catch (err) {
    console.error(err);
  }
};
