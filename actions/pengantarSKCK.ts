"use server";
import { domisiliUsaha } from "@/app/(user)/create-letter/_components/FormDomisiliUsaha";
import { kelahiran } from "@/app/(user)/create-letter/_components/FormKelahiran";
import { pengantarSKCKSchema } from "@/app/(user)/create-letter/_components/FormPengantarSKCK";
import { tinggalPenduduk } from "@/app/(user)/create-letter/_components/FormTinggalPenduduk";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createPengantarSKCK = async (
  data: z.infer<typeof pengantarSKCKSchema>
) => {
  try {
    const currentUser = await getCurrentUser();
    const newPengatarSKCK = await db.pengantarSKCK.create({
      data: {
        ...data,
      },
    });
    await db.letter.create({
      data: {
        pengantarSKCKId: newPengatarSKCK.id!,
        userId: currentUser?.id!,
      },
    });
    revalidatePath("/letters");
    return newPengatarSKCK;
  } catch (err) {
    console.log(err);
  }
};
