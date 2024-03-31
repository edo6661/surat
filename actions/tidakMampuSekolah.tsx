"use server";
import { domisiliUsaha } from "@/app/(user)/create-letter/_components/FormDomisiliUsaha";
import { tidakMampuSekolahSchema } from "@/app/(user)/create-letter/_components/FormTidakMampuSekolah";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createTidakMampuSekolah = async (
  data: z.infer<typeof tidakMampuSekolahSchema>
) => {
  try {
    const currentUser = await getCurrentUser();
    const newTidakMampuSekolah = await db.tidakMampuSekolah.create({
      data: {
        ...data,
      },
    });
    await db.letter.create({
      data: {
        tidakMampuSekolahId: newTidakMampuSekolah.id,
        userId: currentUser?.id!,
      },
    });
    revalidatePath("/letters");
    return newTidakMampuSekolah;
  } catch (err) {
    console.log(err);
  }
};
