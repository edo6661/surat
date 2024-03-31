import { getAllLetters, getAllLettersDomisiliUsaha, getAllLettersKelahiran, getAllLettersKematian, getAllLettersKeteranganBelumMenikah, getAllLettersKeteranganSuamiIstri, getAllLettersKeteranganUsaha, getAllLettersPengantarSKCK, getAllLettersTidakMampu, getAllLettersTidakMampuSekolah, getAllLettersTinggalPenduduk, getCurrentUserLetters, getUserLettersDomisiUsaha, getUserLettersKelahiran, getUserLettersKematian, getUserLettersKeteranganBelumMenikah, getUserLettersKeteranganSuamiIstri, getUserLettersKeteranganUsaha, getUserLettersPengantarSKCK, getUserLettersTidakMampu, getUserLettersTidakMampuSekolah, getUserLettersTinggalPenduduk } from '@/services/letter'
import React from 'react'
import Letters from './_components/Letters'
import { getCurrentUser } from '@/services/user'



const LetterPage = async () => {
  // TODO: Add other letters
  // const lettersDomisiliUsaha = await getAllLettersDomisiliUsaha()
  // const lettersTinggalPenduduk = await getAllLettersTinggalPenduduk()
  // const lettersKelahiran = await getAllLettersKelahiran()
  // const lettersKematian = await getAllLettersKematian()
  // const lettersTidakMampuSekolah = await getAllLettersTidakMampuSekolah()
  // const lettersSkck = await getAllLettersPengantarSKCK()
  // const lettersUsaha = await getAllLettersKeteranganUsaha()
  // const lettersTidakMampu = await getAllLettersTidakMampu()
  // const lettersSuamiIstri = await getAllLettersKeteranganSuamiIstri()
  // const lettersBelumMenikah = await getAllLettersKeteranganBelumMenikah()
  // const userLettersDomisiliUsaha = await getUserLettersDomisiUsaha()
  // const userLettersTinggalPenduduk = await getUserLettersTinggalPenduduk()
  // const userLettersKelahiran = await getUserLettersKelahiran()
  // const userLettersKematian = await getUserLettersKematian()
  // const userLettersTidakMampuSekolah = await getUserLettersTidakMampuSekolah()
  // const userLettersSkck = await getUserLettersPengantarSKCK()
  // const userLettersUsaha = await getUserLettersKeteranganUsaha()
  // const userLettersTidakMampu = await getUserLettersTidakMampu()
  // const userLettersSuamiIstri = await getUserLettersKeteranganSuamiIstri()
  // const userLettersBelumMenikah = await getUserLettersKeteranganBelumMenikah()

  const currentUser = await getCurrentUser()
  const allLetters = await getAllLetters()
  const userLetters = await getCurrentUserLetters()




  return <Letters

    // lettersDomisiliUsaha={lettersDomisiliUsaha!}
    // lettersTinggalPenduduk={lettersTinggalPenduduk!}
    // lettersKelahiran={lettersKelahiran!}
    // lettersKematian={lettersKematian!}
    // lettersTidakMampuSekolah={lettersTidakMampuSekolah!}
    // lettersSkck={lettersSkck!}
    // lettersUsaha={lettersUsaha!}
    // lettersTidakMampu={lettersTidakMampu!}
    // lettersSuamiIstri={lettersSuamiIstri!}
    // lettersBelumMenikah={lettersBelumMenikah!}
    // userLettersDomisiliUsaha={userLettersDomisiliUsaha!}
    // userLettersTinggalPenduduk={userLettersTinggalPenduduk!}
    // userLettersKelahiran={userLettersKelahiran!}
    // userLettersKematian={userLettersKematian!}
    // userLettersTidakMampuSekolah={userLettersTidakMampuSekolah!}
    // userLettersSkck={userLettersSkck!}
    // userLettersUsaha={userLettersUsaha!}
    // userLettersTidakMampu={userLettersTidakMampu!}
    // userLettersSuamiIstri={userLettersSuamiIstri!}
    // userLettersBelumMenikah={userLettersBelumMenikah!}
    allLetters={allLetters!}
    userLetters={userLetters!}
    currentUser={currentUser!}
  />
}

export default LetterPage