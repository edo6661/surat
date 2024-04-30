import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
export const getCurrentUser = async () => {
  const self = await currentUser();
  if (!self) return null;
  try {
    return await db.user.findUnique({
      where: {
        externalUserId: self.id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getAllUsers = async () => {
  try {
    const currentUser = await getCurrentUser();
    return await db.user.findMany({
      where: {
        NOT: {
          id: currentUser?.id,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
