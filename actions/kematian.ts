"use server";
import { domisiliUsaha } from "@/app/(user)/create-letter/_components/FormDomisiliUsaha";
import { kelahiran } from "@/app/(user)/create-letter/_components/FormKelahiran";
import { kematianSchema } from "@/app/(user)/create-letter/_components/FormKematian";
import { tinggalPenduduk } from "@/app/(user)/create-letter/_components/FormTinggalPenduduk";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createKematian = async (data: z.infer<typeof kematianSchema>) => {
  try {
    const currentUser = await getCurrentUser();
    const newKematian = await db.kematian.create({
      data: {
        ...data,
      },
    });
    await db.letter.create({
      data: {
        kematianId: newKematian.id,
        userId: currentUser?.id!,
      },
    });
    revalidatePath("/letters");
    return newKematian;
  } catch (err) {
    console.log(err);
  }
};
