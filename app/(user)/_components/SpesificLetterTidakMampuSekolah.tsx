"use client"
import { Letter, Role, TinggalPenduduk } from '@prisma/client';
import React from 'react'
import DownloadPdf from './DownloadPdf';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { fetchImageBlob } from '@/utils/fetchImageBlob';
import { formatDate } from '@/utils/formateDate';
import { logoUrl } from '@/constants';
import { toast } from 'sonner';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
interface SpesificLetterTidakMampuSekolahProps {
  letter: any;
  role: Role
}

const SpesificLetterTidakMampuSekolah = (
  { letter, role }: SpesificLetterTidakMampuSekolahProps
) => {

  const generatePdf = async () => {
    if (!letter || !letter.tidakMampuSekolah) return;
    if (!letter.signature) return toast.error('Please wait signature to be added by the subdistrict officer');


    const logo = await fetchImageBlob(logoUrl);
    const letterSignature = await fetchImageBlob(letter?.signature!);
    const documentDefinition = {
      header: {
        columns: [
          { image: logo, width: 72, margin: [20, 0, 0, 0], },


        ],
        margin: [0, 20, 0, 20]
      },
      content: [
        { text: 'PEMERINTAHAN KOTA TANGERANG', style: 'header', },
        { text: 'KECAMATAN JATIUWUNG', style: 'subheader', alignment: 'center' },
        {
          text: "Jl. Gatot Subroto Km. 5 15134, Tangerang",
          alignment: 'center',
          fontSize: 10,
          margin: [0, 0, 0, 5]
        },
        {
          text: "021-69301883",
          alignment: 'center',
          fontSize: 8,
        },

        {
          canvas: [{ type: 'line', x1: 0, y1: 0, x2: 595.28 - 120, y2: 0, lineWidth: 1, }],
          margin: [0, 10, 0, 10]
        },
        { text: 'Surat Tidak Mampu Sekolah', style: 'subheader', alignment: 'center', decoration: 'underline' },
        { text: 'Dengan hormat,', style: 'normal' },
        {
          text: `Yang bertanda tangan di bawah ini, kami Camat Jatiuwung, Kecamatan Jatiuwung,
  Kota Tangerang, menerangkan dengan sebenarnya kepada:`,
          style: 'normal',
          margin: [0, 10, 0, 0]
        },
        { text: `Nama: ${letter.tidakMampuSekolah.nama}`, style: 'normal', margin: [16, 12, 0, 0] },
        { text: `Tempat Lahir: ${letter.tidakMampuSekolah.tempatLahir}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Tanggal Lahir: ${formatDate(letter.tidakMampuSekolah.tanggalLahir)}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Jenis Kelamin: ${letter.tidakMampuSekolah.jenisKelamin}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Agama: ${letter.tidakMampuSekolah.agama}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Alamat: ${letter.tidakMampuSekolah.alamat}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Alasan Tidak Mampu Sekolah: ${letter.tidakMampuSekolah.alasanTidakMampu}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Nama Ayah: ${letter.tidakMampuSekolah.namaAyah}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `NIK Ayah: ${letter.tidakMampuSekolah.nikAyah}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Tempat Lahir Ayah: ${letter.tidakMampuSekolah.tempatLahirAyah}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Tanggal Lahir Ayah: ${formatDate(letter.tidakMampuSekolah.tanggalLahirAyah)}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Agama Ayah: ${letter.tidakMampuSekolah.agamaAyah}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Pekerjaan Ayah: ${letter.tidakMampuSekolah.pekerjaanAyah}`, style: 'normal', margin: [16, 8, 0, 12] },

        { text: 'Demikian Surat Keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.', style: 'normal' },
        { text: 'Hormat kami,', style: 'normal' },
        { text: `Kota Tangerang ${formatDate(letter.createdAt)}`, style: 'normal', alignment: 'right' },
        { text: `Yang Menyatakan`, style: 'normal', alignment: 'right' },
        letterSignature ?
          { image: letterSignature, width: 120, alignment: 'right', margin: [0, 40, 0, 20] } :
          { text: '( ___________________________ )', margin: [0, 40, 0, 20], alignment: 'right' },
        letterSignature ? {
          text: "EDIH, S.SOS", alignment: 'right', margin: [0, 12, 20, 0], decoration: 'underline'
        } : null
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          alignment: 'center',

        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        normal: {
          fontSize: 12,
          margin: [0, 5, 0, 5]
        }
      }
    };
    // @ts-ignore
    pdfMake.createPdf(documentDefinition).download(
      `${letter.tidakMampuSekolah.nama}_SuratKeteranganTidakMampuSekolah.pdf`
    );
  };


  return <DownloadPdf generatePdf={generatePdf} />
}

export default SpesificLetterTidakMampuSekolah