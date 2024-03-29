"use server";
import { domisiliUsaha } from "@/app/(user)/create-letter/_components/FormDomisiliUsaha";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user";
import { z } from "zod";

export const createDomisiliUsaha = async (
  data: z.infer<typeof domisiliUsaha>
) => {
  try {
    const currentUser = await getCurrentUser();
    const newDomisiliUsaha = await db.domisiliUsaha.create({
      data: {
        ...data,
      },
    });
    await db.letter.create({
      data: {
        domisiliUsahaId: newDomisiliUsaha.id,
        userId: currentUser?.id!,
      },
    });
    return newDomisiliUsaha;
  } catch (err) {
    console.log(err);
  }
};
