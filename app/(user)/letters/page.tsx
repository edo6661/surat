import {
  getAllLetters,
  getAllLettersDomisiliUsaha,
  getAllLettersKelahiran,
  getAllLettersKematian,
  getAllLettersKeteranganBelumMenikah,
  getAllLettersKeteranganSuamiIstri,
  getAllLettersKeteranganUsaha,
  getAllLettersPengantarSKCK,
  getAllLettersTidakMampu,
  getAllLettersTidakMampuSekolah,
  getAllLettersTinggalPenduduk,
  getCurrentUserLetters,
  getUserLettersDomisiUsaha,
  getUserLettersKelahiran,
  getUserLettersKematian,
  getUserLettersKeteranganBelumMenikah,
  getUserLettersKeteranganSuamiIstri,
  getUserLettersKeteranganUsaha,
  getUserLettersPengantarSKCK,
  getUserLettersTidakMampu,
  getUserLettersTidakMampuSekolah,
  getUserLettersTinggalPenduduk,
} from "@/services/letter";
import React from "react";
import Letters from "./_components/Letters";
import { getCurrentUser } from "@/services/user";

const LetterPage = async () => {
  const currentUser = await getCurrentUser();
  const allLetters = await getAllLetters();
  const userLetters = await getCurrentUserLetters();

  return (
    <Letters
      allLetters={allLetters!}
      userLetters={userLetters!}
      currentUser={currentUser!}
    />
  );
};

export default LetterPage;
