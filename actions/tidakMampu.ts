"use server";
import { domisiliUsaha } from "@/app/(user)/create-letter/_components/FormDomisiliUsaha";
import { kelahiran } from "@/app/(user)/create-letter/_components/FormKelahiran";
import { kematianSchema } from "@/app/(user)/create-letter/_components/FormKematian";
import { tidakMampuSchema } from "@/app/(user)/create-letter/_components/FormTidakMampu";
import { tinggalPenduduk } from "@/app/(user)/create-letter/_components/FormTinggalPenduduk";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createTidakMampu = async (
  data: z.infer<typeof tidakMampuSchema>
) => {
  try {
    const currentUser = await getCurrentUser();
    const newTidakMampu = await db.tidakMampu.create({
      data: {
        ...data,
        pendapatan: +data.pendapatan,
      },
    });
    await db.letter.create({
      data: {
        tidakMampuId: newTidakMampu.id,
        userId: currentUser?.id!,
      },
    });
    revalidatePath("/letters");
    return newTidakMampu;
  } catch (err) {
    console.log(err);
  }
};
