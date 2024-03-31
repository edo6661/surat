"use server";
import { belumMenikahSchema } from "@/app/(user)/create-letter/_components/FormBelumMenikah";
import { domisiliUsaha } from "@/app/(user)/create-letter/_components/FormDomisiliUsaha";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createBelumMenikah = async (
  data: z.infer<typeof belumMenikahSchema>
) => {
  try {
    const currentUser = await getCurrentUser();
    const belumMenikah = await db.keteranganBelumMenikah.create({
      data: {
        ...data,
      },
    });
    await db.letter.create({
      data: {
        keteranganBelumMenikahId: belumMenikah.id,
        userId: currentUser?.id!,
      },
    });
    revalidatePath("/letters");
    return belumMenikah;
  } catch (err) {
    console.log(err);
  }
};
