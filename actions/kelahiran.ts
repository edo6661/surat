"use server";
import { domisiliUsaha } from "@/app/(user)/create-letter/_components/FormDomisiliUsaha";
import { kelahiran } from "@/app/(user)/create-letter/_components/FormKelahiran";
import { tinggalPenduduk } from "@/app/(user)/create-letter/_components/FormTinggalPenduduk";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createKelahiran = async (data: z.infer<typeof kelahiran>) => {
  try {
    const currentUser = await getCurrentUser();
    const newKelahiran = await db.kelahiran.create({
      data: {
        ...data,
      },
    });
    await db.letter.create({
      data: {
        kelahiranId: newKelahiran.id!,
        userId: currentUser?.id!,
      },
    });
    revalidatePath("/letters");
    return newKelahiran;
  } catch (err) {
    console.log(err);
  }
};
