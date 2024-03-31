import { db } from "@/lib/db";
import { getCurrentUser } from "./user";

const allTrue = {
  user: true,
  domisiliUsaha: true,
  tinggalPenduduk: true,
  kelahiran: true,
  kematian: true,
  tidakMampuSekolah: true,
  pengantarSKCK: true,
  keteranganUsaha: true,
  tidakMampu: true,
  keteranganSuamiIstri: true,
  keteranganBelumMenikah: true,
};

export const getAllLetters = async () => {
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getCurrentUserLetters = async () => {
  const user = await getCurrentUser();
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        userId: user?.id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllLettersDomisiliUsaha = async () => {
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        domisiliUsahaId: {
          not: null,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getAllLettersTinggalPenduduk = async () => {
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        tinggalPendudukId: {
          not: null,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getAllLettersKelahiran = async () => {
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        kelahiranId: {
          not: null,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getAllLettersKematian = async () => {
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        kematianId: {
          not: null,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getAllLettersTidakMampuSekolah = async () => {
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        tidakMampuSekolahId: {
          not: null,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getAllLettersPengantarSKCK = async () => {
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        pengantarSKCKId: {
          not: null,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getAllLettersKeteranganUsaha = async () => {
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        keteranganUsahaId: {
          not: null,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getAllLettersTidakMampu = async () => {
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        tidakMampuId: {
          not: null,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getAllLettersKeteranganSuamiIstri = async () => {
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        keteranganSuamiIstriId: {
          not: null,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getAllLettersKeteranganBelumMenikah = async () => {
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        keteranganBelumMenikahId: {
          not: null,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getLetterById = async (id: string) => {
  try {
    return await db.letter.findUnique({
      where: {
        id,
      },
      include: {
        ...allTrue,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUserLettersDomisiUsaha = async () => {
  const user = await getCurrentUser();
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        domisiliUsahaId: {
          not: null,
        },
        userId: user?.id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getUserLettersTinggalPenduduk = async () => {
  const user = await getCurrentUser();
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        tinggalPendudukId: {
          not: null,
        },
        userId: user?.id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getUserLettersKelahiran = async () => {
  const user = await getCurrentUser();
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        kelahiranId: {
          not: null,
        },
        userId: user?.id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUserLettersKematian = async () => {
  const user = await getCurrentUser();
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        kematianId: {
          not: null,
        },
        userId: user?.id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getUserLettersTidakMampuSekolah = async () => {
  const user = await getCurrentUser();
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        tidakMampuSekolahId: {
          not: null,
        },
        userId: user?.id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getUserLettersPengantarSKCK = async () => {
  const user = await getCurrentUser();
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        pengantarSKCKId: {
          not: null,
        },
        userId: user?.id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getUserLettersKeteranganUsaha = async () => {
  const user = await getCurrentUser();
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        keteranganUsahaId: {
          not: null,
        },
        userId: user?.id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getUserLettersTidakMampu = async () => {
  const user = await getCurrentUser();
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        tidakMampuId: {
          not: null,
        },
        userId: user?.id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getUserLettersKeteranganSuamiIstri = async () => {
  const user = await getCurrentUser();
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        keteranganSuamiIstriId: {
          not: null,
        },
        userId: user?.id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const getUserLettersKeteranganBelumMenikah = async () => {
  const user = await getCurrentUser();
  try {
    return await db.letter.findMany({
      include: {
        ...allTrue,
      },
      where: {
        keteranganBelumMenikahId: {
          not: null,
        },
        userId: user?.id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
