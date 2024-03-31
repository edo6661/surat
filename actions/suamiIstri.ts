"use server";
import { domisiliUsaha } from "@/app/(user)/create-letter/_components/FormDomisiliUsaha";
import { kelahiran } from "@/app/(user)/create-letter/_components/FormKelahiran";
import { kematianSchema } from "@/app/(user)/create-letter/_components/FormKematian";
import { suamiIstriSchema } from "@/app/(user)/create-letter/_components/FormSuamiIstri";
import { tinggalPenduduk } from "@/app/(user)/create-letter/_components/FormTinggalPenduduk";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createSuamiIstri = async (
  data: z.infer<typeof suamiIstriSchema>
) => {
  try {
    const currentUser = await getCurrentUser();
    const suamiIstri = await db.keteranganSuamiIstri.create({
      data: {
        ...data,
      },
    });
    await db.letter.create({
      data: {
        keteranganSuamiIstriId: suamiIstri.id,
        userId: currentUser?.id!,
      },
    });
    revalidatePath("/letters");
    return suamiIstri;
  } catch (err) {
    console.log(err);
  }
};
