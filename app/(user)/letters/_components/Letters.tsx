"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import FormDomisiliUsaha from './KeteranganDomisiliUsaha'
import { LetterAllRelation } from '@/types'
import { FormulirType, tableHeadDomisiliUsaha, tableHeadKelahiran, tableHeadKematian, tableHeadKeteranganBelumMenikah, tableHeadKeteranganSuamiIstri, tableHeadKeteranganUsaha, tableHeadPengantarSKCK, tableHeadTidakMampu, tableHeadTidakMampuSekolah, tableHeadTinggalPenduduk } from "@/constants/letter"
import { useState } from "react"
import SelectCategory from "../../create-letter/_components/SelectCategory"
import KeteranganBelumMenikah from "./KeteranganBelumMenikah"
import Kelahiran from "./KeteranganKelahiran"
import Kematian from "./KeteranganKematin"
import PengantarSKCK from "./KeteranganPengantarSKCK"
import TinggalPenduduk from "./KeteranganTinggalPenduduk"
import TidakMampuSekolah from "./KeteranganTidakMampuSekolah"
import TidakMampu from "./KeteranganTidakMampu"
import KeteranganUsaha from "./KeteranganUsaha"
import KeteranganSuamiIstri from "./KeteranganSuamiIstri"
import { User } from "@prisma/client"
import { Heading } from "@/components/custom-ui/heading"

interface LettersProps {
  // lettersDomisiliUsaha: LetterAllRelation[]
  // lettersTinggalPenduduk: LetterAllRelation[]
  // lettersKelahiran: LetterAllRelation[]
  // lettersKematian: LetterAllRelation[]
  // lettersTidakMampuSekolah: LetterAllRelation[]
  // lettersSkck: LetterAllRelation[]
  // lettersUsaha: LetterAllRelation[]
  // lettersTidakMampu: LetterAllRelation[]
  // lettersSuamiIstri: LetterAllRelation[]
  // lettersBelumMenikah: LetterAllRelation[]
  // userLettersDomisiliUsaha: LetterAllRelation[]
  // userLettersTinggalPenduduk: LetterAllRelation[]
  // userLettersKelahiran: LetterAllRelation[]
  // userLettersKematian: LetterAllRelation[]
  // userLettersTidakMampuSekolah: LetterAllRelation[]
  // userLettersSkck: LetterAllRelation[]
  // userLettersUsaha: LetterAllRelation[]
  // userLettersTidakMampu: LetterAllRelation[]
  // userLettersSuamiIstri: LetterAllRelation[]
  // userLettersBelumMenikah: LetterAllRelation[]
  allLetters: LetterAllRelation[]
  userLetters: LetterAllRelation[]
  currentUser: User
}


const Letters = (
  {
    // lettersDomisiliUsaha,
    // lettersTinggalPenduduk,
    // lettersKelahiran,
    // lettersKematian,
    // lettersTidakMampuSekolah,
    // lettersSkck,
    // lettersUsaha,
    // lettersTidakMampu,
    // lettersSuamiIstri,
    // lettersBelumMenikah,
    // userLettersDomisiliUsaha,
    // userLettersTinggalPenduduk,
    // userLettersKelahiran,
    // userLettersKematian,
    // userLettersTidakMampuSekolah,
    // userLettersSkck,
    // userLettersUsaha,
    // userLettersTidakMampu,
    // userLettersSuamiIstri,
    // userLettersBelumMenikah,
    allLetters,
    userLetters,
    currentUser
  }: LettersProps
) => {
  const [selectedItem, setSelectedItem] = useState<FormulirType | null>(null);

  const handleSelect = (value: FormulirType | null) => setSelectedItem(value);

  const tableHeadMappings = {
    "Domisili Usaha": tableHeadDomisiliUsaha,
    "Tinggal Penduduk": tableHeadTinggalPenduduk,
    "Belum Menikah": tableHeadKeteranganBelumMenikah,
    "Kelahiran": tableHeadKelahiran,
    "Kematian": tableHeadKematian,
    "Pengantar SKCK": tableHeadPengantarSKCK,
    "Suami Istri": tableHeadKeteranganSuamiIstri,
    "Tidak Mampu (Sekolah)": tableHeadTidakMampuSekolah,
    "Tidak Mampu (Umum)": tableHeadTidakMampu,
    "Usaha": tableHeadKeteranganUsaha,
  };


  const tableHead = tableHeadMappings[selectedItem!] || []

  const lettersMap = {
    "Domisili Usaha": allLetters.filter(letter => letter.domisiliUsahaId !== null),
    "Tinggal Penduduk": allLetters.filter(letter => letter.tinggalPendudukId !== null),
    "Kelahiran": allLetters.filter(letter => letter.kelahiranId !== null),
    "Kematian": allLetters.filter(letter => letter.kematianId !== null),
    "Tidak Mampu (Sekolah)": allLetters.filter(letter => letter.tidakMampuSekolahId !== null),
    "Pengantar SKCK": allLetters.filter(letter => letter.pengantarSKCKId !== null),
    "Usaha": allLetters.filter(letter => letter.keteranganUsahaId !== null),
    "Tidak Mampu (Umum)": allLetters.filter(letter => letter.tidakMampuId !== null),
    "Suami Istri": allLetters.filter(letter => letter.keteranganSuamiIstriId !== null),
    "Belum Menikah": allLetters.filter(letter => letter.keteranganBelumMenikahId !== null),
  };

  const userLettersMap = {
    "Domisili Usaha": userLetters.filter(letter => letter.domisiliUsahaId !== null),
    "Tinggal Penduduk": userLetters.filter(letter => letter.tinggalPendudukId !== null),
    "Kelahiran": userLetters.filter(letter => letter.kelahiranId !== null),
    "Kematian": userLetters.filter(letter => letter.kematianId !== null),
    "Tidak Mampu (Sekolah)": userLetters.filter(letter => letter.tidakMampuSekolahId !== null),
    "Pengantar SKCK": userLetters.filter(letter => letter.pengantarSKCKId !== null),
    "Usaha": userLetters.filter(letter => letter.keteranganUsahaId !== null),
    "Tidak Mampu (Umum)": userLetters.filter(letter => letter.tidakMampuId !== null),
    "Suami Istri": userLetters.filter(letter => letter.keteranganSuamiIstriId !== null),
    "Belum Menikah": userLetters.filter(letter => letter.keteranganBelumMenikahId !== null),
  };

  // @ts-ignore
  const letters = currentUser.role === "APPLICANT" ? userLettersMap[selectedItem!] || [] : lettersMap[selectedItem!] || []


  return (
    <section className='base-container'>
      <Card>
        <CardHeader>
          <CardTitle>Letters Page</CardTitle>
          <CardDescription>Letters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SelectCategory handleSelect={handleSelect} />
          <Table>
            <TableCaption>A list of your recent Letters.</TableCaption>
            <TableHeader>
              <TableRow>
                {tableHead.map((head) => {
                  return currentUser.role === "APPLICANT" ? (
                    head === "User" || head === "Action" ? null :
                      <TableCell key={head}>{head}</TableCell>
                  ) : (
                    <TableCell key={head}>{head}</TableCell>
                  )
                }
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {letters.length > 0 ? letters?.map((letter) => {
                return selectedItem === "Domisili Usaha" ? (
                  <FormDomisiliUsaha key={letter.id} {...letter} domisiliUsaha={letter.domisiliUsaha!}
                    currentUser={currentUser}
                  />
                ) : selectedItem === "Belum Menikah" ? (
                  <KeteranganBelumMenikah key={letter.id} {...letter} keteranganBelumMenikah={letter?.keteranganBelumMenikah!}
                    currentUser={currentUser}
                  />
                ) : selectedItem === "Kelahiran" ? (
                  <Kelahiran key={letter.id} {...letter} kelahiran={letter.kelahiran!}
                    currentUser={currentUser}
                  />
                ) : selectedItem === "Kematian" ? (
                  <Kematian key={letter.id} {...letter} kematian={letter.kematian!}
                    currentUser={currentUser}
                  />
                ) : selectedItem === "Pengantar SKCK" ? (
                  <PengantarSKCK key={letter.id} {...letter} pengantarSKCK={letter.pengantarSKCK!}
                    currentUser={currentUser}

                  />
                ) : selectedItem === "Suami Istri" ? (
                  <KeteranganSuamiIstri key={letter.id} {...letter} keteranganSuamiIstri={letter?.keteranganSuamiIstri!}
                    currentUser={currentUser}

                  />
                ) : selectedItem === "Tidak Mampu (Sekolah)" ? (
                  <TidakMampuSekolah key={letter.id} {...letter} tidakMampuSekolah={letter?.tidakMampuSekolah!}
                    currentUser={currentUser}

                  />
                ) : selectedItem === "Tidak Mampu (Umum)" ? (
                  <TidakMampu key={letter.id} {...letter} tidakMampu={letter?.tidakMampu!}
                    currentUser={currentUser}

                  />
                ) : selectedItem === "Usaha" ? (
                  <KeteranganUsaha key={letter.id} {...letter} keteranganUsaha={letter?.keteranganUsaha!}
                    currentUser={currentUser}
                  />
                ) : selectedItem === "Tinggal Penduduk" ? (
                  <TinggalPenduduk key={letter.id} {...letter} tinggalPenduduk={letter?.tinggalPenduduk!}
                    currentUser={currentUser}
                  />
                ) : null
              }) : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  )
}

export default Letters 