"use server";
import { domisiliUsaha } from "@/app/(user)/create-letter/_components/FormDomisiliUsaha";
import { kelahiran } from "@/app/(user)/create-letter/_components/FormKelahiran";
import { keteranganUsahaSchema } from "@/app/(user)/create-letter/_components/FormKeteranganUsaha";
import { tinggalPenduduk } from "@/app/(user)/create-letter/_components/FormTinggalPenduduk";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createKeteranganUsaha = async (
  data: z.infer<typeof keteranganUsahaSchema>
) => {
  try {
    const currentUser = await getCurrentUser();
    const newKeteranganusaha = await db.keteranganUsaha.create({
      data: {
        ...data,
      },
    });
    await db.letter.create({
      data: {
        keteranganUsahaId: newKeteranganusaha.id!,
        userId: currentUser?.id!,
      },
    });
    revalidatePath("/letters");
    return newKeteranganusaha;
  } catch (err) {
    console.log(err);
  }
};
