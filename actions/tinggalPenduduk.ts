"use server";
import { domisiliUsaha } from "@/app/(user)/create-letter/_components/FormDomisiliUsaha";
import { tinggalPenduduk } from "@/app/(user)/create-letter/_components/FormTinggalPenduduk";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user";
import { z } from "zod";

export const createTinggalPenduduk = async (
  data: z.infer<typeof tinggalPenduduk>
) => {
  try {
    const currentUser = await getCurrentUser();
    const newTinggalPenduduk = await db.tinggalPenduduk.create({
      data: {
        ...data,
      },
    });
    await db.letter.create({
      data: {
        tinggalPendudukId: newTinggalPenduduk.id,
        userId: currentUser?.id!,
      },
    });
    return newTinggalPenduduk;
  } catch (err) {
    console.log(err);
  }
};
