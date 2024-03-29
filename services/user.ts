import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
export const getCurrentUser = async () => {
  const self = await currentUser();
  try {
    return await db.user.findUnique({
      where: {
        externalUserId: self?.id!,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
