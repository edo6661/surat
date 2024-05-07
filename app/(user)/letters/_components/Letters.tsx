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
import SelectFilter from "./SelectFilter"

interface LettersProps {
  allLetters: LetterAllRelation[]
  userLetters: LetterAllRelation[]
  currentUser: User
}


const Letters = (
  {
    allLetters,
    userLetters,
    currentUser
  }: LettersProps
) => {

  const { role } = currentUser
  const [selectedItem, setSelectedItem] = useState<FormulirType | null>(null);
  const [selectedItemFilter, setSelectedItemFilter] = useState("All")

  const handleSelect = (value: FormulirType | null) => setSelectedItem(value);
  const handleSelectFilter = (value: string) => setSelectedItemFilter(value);

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

  const baseLettersItem = {
    "Domisili Usaha": role === "APPLICANT" ? userLetters.filter(letter => letter.domisiliUsahaId !== null) : allLetters.filter(letter => letter.domisiliUsahaId !== null),
    "Tinggal Penduduk": role === "APPLICANT" ? userLetters.filter(letter => letter.tinggalPendudukId !== null) : allLetters.filter(letter => letter.tinggalPendudukId !== null),
    "Kelahiran": role === "APPLICANT" ? userLetters.filter(letter => letter.kelahiranId !== null) : allLetters.filter(letter => letter.kelahiranId !== null),
    "Kematian": role === "APPLICANT" ? userLetters.filter(letter => letter.kematianId !== null) : allLetters.filter(letter => letter.kematianId !== null),
    "Tidak Mampu (Sekolah)": role === "APPLICANT" ? userLetters.filter(letter => letter.tidakMampuSekolahId !== null) : allLetters.filter(letter => letter.tidakMampuSekolahId !== null),
    "Pengantar SKCK": role === "APPLICANT" ? userLetters.filter(letter => letter.pengantarSKCKId !== null) : allLetters.filter(letter => letter.pengantarSKCKId !== null),
    "Usaha": role === "APPLICANT" ? userLetters.filter(letter => letter.keteranganUsahaId !== null) : allLetters.filter(letter => letter.keteranganUsahaId !== null),
    "Tidak Mampu (Umum)": role === "APPLICANT" ? userLetters.filter(letter => letter.tidakMampuId !== null) : allLetters.filter(letter => letter.tidakMampuId !== null),
    "Suami Istri": role === "APPLICANT" ? userLetters.filter(letter => letter.keteranganSuamiIstriId !== null) : allLetters.filter(letter => letter.keteranganSuamiIstriId !== null),
    "Belum Menikah": role === "APPLICANT" ? userLetters.filter(letter => letter.keteranganBelumMenikahId !== null) : allLetters.filter(letter => letter.keteranganBelumMenikahId !== null),

  }


  const lettersMap = {
    "Domisili Usaha": selectedItemFilter === "All" ? baseLettersItem["Domisili Usaha"] : selectedItemFilter === "Approved" ? baseLettersItem["Domisili Usaha"].filter(letter => letter.approved === true) : baseLettersItem["Domisili Usaha"].filter(letter => letter.approved === false),
    "Tinggal Penduduk": selectedItemFilter === "All" ? baseLettersItem["Tinggal Penduduk"] : selectedItemFilter === "Approved" ? baseLettersItem["Tinggal Penduduk"].filter(letter => letter.approved === true) : baseLettersItem["Tinggal Penduduk"].filter(letter => letter.approved === false),
    "Kelahiran": selectedItemFilter === "All" ? baseLettersItem["Kelahiran"] : selectedItemFilter === "Approved" ? baseLettersItem["Kelahiran"].filter(letter => letter.approved === true) : baseLettersItem["Kelahiran"].filter(letter => letter.approved === false),
    "Kematian": selectedItemFilter === "All" ? baseLettersItem["Kematian"] : selectedItemFilter === "Approved" ? baseLettersItem["Kematian"].filter(letter => letter.approved === true) : baseLettersItem["Kematian"].filter(letter => letter.approved === false),
    "Tidak Mampu (Sekolah)": selectedItemFilter === "All" ? baseLettersItem["Tidak Mampu (Sekolah)"] : selectedItemFilter === "Approved" ? baseLettersItem["Tidak Mampu (Sekolah)"].filter(letter => letter.approved === true) : baseLettersItem["Tidak Mampu (Sekolah)"].filter(letter => letter.approved === false),
    "Pengantar SKCK": selectedItemFilter === "All" ? baseLettersItem["Pengantar SKCK"] : selectedItemFilter === "Approved" ? baseLettersItem["Pengantar SKCK"].filter(letter => letter.approved === true) : baseLettersItem["Pengantar SKCK"].filter(letter => letter.approved === false),
    "Usaha": selectedItemFilter === "All" ? baseLettersItem["Usaha"] : selectedItemFilter === "Approved" ? baseLettersItem["Usaha"].filter(letter => letter.approved === true) : baseLettersItem["Usaha"].filter(letter => letter.approved === false),
    "Tidak Mampu (Umum)": selectedItemFilter === "All" ? baseLettersItem["Tidak Mampu (Umum)"] : selectedItemFilter === "Approved" ? baseLettersItem["Tidak Mampu (Umum)"].filter(letter => letter.approved === true) : baseLettersItem["Tidak Mampu (Umum)"].filter(letter => letter.approved === false),
    "Suami Istri": selectedItemFilter === "All" ? baseLettersItem["Suami Istri"] : selectedItemFilter === "Approved" ? baseLettersItem["Suami Istri"].filter(letter => letter.approved === true) : baseLettersItem["Suami Istri"].filter(letter => letter.approved === false),
    "Belum Menikah": selectedItemFilter === "All" ? baseLettersItem["Belum Menikah"] : selectedItemFilter === "Approved" ? baseLettersItem["Belum Menikah"].filter(letter => letter.approved === true)
      : baseLettersItem["Belum Menikah"].filter(letter => letter.approved === false),
  };

  const letterCount = {
    "Domisili Usaha": baseLettersItem["Domisili Usaha"].filter(letter => letter.approved === false).length,
    "Tinggal Penduduk": baseLettersItem["Tinggal Penduduk"].filter(letter => letter.approved === false).length,
    "Kelahiran": baseLettersItem["Kelahiran"].filter(letter => letter.approved === false).length,
    "Kematian": baseLettersItem["Kematian"].filter(letter => letter.approved === false).length,
    "Tidak Mampu (Sekolah)": baseLettersItem["Tidak Mampu (Sekolah)"].filter(letter => letter.approved === false).length,
    "Pengantar SKCK": baseLettersItem["Pengantar SKCK"].filter(letter => letter.approved === false).length,
    "Usaha": baseLettersItem["Usaha"].filter(letter => letter.approved === false).length,
    "Tidak Mampu (Umum)": baseLettersItem["Tidak Mampu (Umum)"].filter(letter => letter.approved === false).length,
    "Suami Istri": baseLettersItem["Suami Istri"].filter(letter => letter.approved === false).length,
    "Belum Menikah": baseLettersItem["Belum Menikah"].filter(letter => letter.approved === false).length,
  }

  const letterFilterCount = {
    "All": selectedItem === "Domisili Usaha" ? baseLettersItem["Domisili Usaha"].length : selectedItem === "Tinggal Penduduk" ? baseLettersItem["Tinggal Penduduk"].length : selectedItem === "Kelahiran" ? baseLettersItem["Kelahiran"].length : selectedItem === "Kematian" ? baseLettersItem["Kematian"].length : selectedItem === "Pengantar SKCK" ? baseLettersItem["Pengantar SKCK"].length : selectedItem === "Suami Istri" ? baseLettersItem["Suami Istri"].length : selectedItem === "Tidak Mampu (Sekolah)" ? baseLettersItem["Tidak Mampu (Sekolah)"].length : selectedItem === "Tidak Mampu (Umum)" ? baseLettersItem["Tidak Mampu (Umum)"].length : selectedItem === "Usaha" ? baseLettersItem["Usaha"].length : selectedItem === "Belum Menikah" ? baseLettersItem["Belum Menikah"].length : allLetters,
    "Approved": selectedItem === "Domisili Usaha" ? baseLettersItem["Domisili Usaha"].filter(letter => letter.approved === true).length : selectedItem === "Tinggal Penduduk" ? baseLettersItem["Tinggal Penduduk"].filter(letter => letter.approved === true).length : selectedItem === "Kelahiran" ? baseLettersItem["Kelahiran"].filter(letter => letter.approved === true).length : selectedItem === "Kematian" ? baseLettersItem["Kematian"].filter(letter => letter.approved === true).length : selectedItem === "Pengantar SKCK" ? baseLettersItem["Pengantar SKCK"].filter(letter => letter.approved === true).length : selectedItem === "Suami Istri" ? baseLettersItem["Suami Istri"].filter(letter => letter.approved === true).length : selectedItem === "Tidak Mampu (Sekolah)" ? baseLettersItem["Tidak Mampu (Sekolah)"].filter(letter => letter.approved === true).length : selectedItem === "Tidak Mampu (Umum)" ? baseLettersItem["Tidak Mampu (Umum)"].filter(letter => letter.approved === true).length : selectedItem === "Usaha" ? baseLettersItem["Usaha"].filter(letter => letter.approved === true).length : selectedItem === "Belum Menikah" ? baseLettersItem["Belum Menikah"].filter(letter => letter.approved === true).length : allLetters.filter(letter => letter.approved === true),
    "Not Approved": selectedItem === "Domisili Usaha" ? baseLettersItem["Domisili Usaha"].filter(letter => letter.approved === false).length : selectedItem === "Tinggal Penduduk" ? baseLettersItem["Tinggal Penduduk"].filter(letter => letter.approved === false).length : selectedItem === "Kelahiran" ? baseLettersItem["Kelahiran"].filter(letter => letter.approved === false).length : selectedItem === "Kematian" ? baseLettersItem["Kematian"].filter(letter => letter.approved === false).length : selectedItem === "Pengantar SKCK" ? baseLettersItem["Pengantar SKCK"].filter(letter => letter.approved === false).length : selectedItem === "Suami Istri" ? baseLettersItem["Suami Istri"].filter(letter => letter.approved === false).length : selectedItem === "Tidak Mampu (Sekolah)" ? baseLettersItem["Tidak Mampu (Sekolah)"].filter(letter => letter.approved === false).length : selectedItem === "Tidak Mampu (Umum)" ? baseLettersItem["Tidak Mampu (Umum)"].filter(letter => letter.approved === false).length : selectedItem === "Usaha" ? baseLettersItem["Usaha"].filter(letter => letter.approved === false).length : selectedItem === "Belum Menikah" ? baseLettersItem["Belum Menikah"].filter(letter => letter.approved === false).length : allLetters.filter(letter => letter.approved === false),
  }





  return (
    <section className='base-container space-y-12'>
      <Card>
        <CardHeader>
          <CardTitle>Letters Page</CardTitle>
          <CardDescription>Letters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SelectCategory handleSelect={handleSelect}
            letterCount={letterCount}
            role={currentUser.role}
          />
          {
            selectedItem && (
              <SelectFilter
                handleSelect={handleSelectFilter}
                letterCount={letterFilterCount}
                role={currentUser.role}
              />
            )
          }
          <Table>
            <TableHeader>
              <TableRow>
                {tableHead.map((head) => {
                  return currentUser.role === "APPLICANT" ? (
                    head === "User" || head === "Action" || head === "Delete" ? null :
                      <TableCell key={head}>

                        {head}
                      </TableCell>
                  ) : (
                    <TableCell key={head}>
                      {head}

                    </TableCell>
                  )
                }
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedItem && lettersMap[selectedItem!].length > 0 && lettersMap[selectedItem!].map((letter) => {
                // ! only this can be signatured
                // TODO : add signature to other letters
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
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </section>
  )
}

export default Letters 