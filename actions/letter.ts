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
export const toggleApproveLetterWithId = async (
  id: string,
  approve: boolean
) => {
  try {
    await db.letter.update({
      where: {
        id,
      },
      data: {
        approved: !approve,
      },
    });
    revalidatePath("/letters");
  } catch (err) {
    console.error(err);
  }
};
export const addSignatureToLetter = async (id: string, signature: string) => {
  try {
    await db.letter.update({
      where: {
        id,
      },
      data: {
        signature,
        approved: true,
      },
    });
    revalidatePath("/letters");
    revalidatePath(`/letters/${id}`);
  } catch (err) {
    console.error(err);
  }
};
