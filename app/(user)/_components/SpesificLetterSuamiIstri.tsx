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
interface SpesificLetterSuamiIstriProps {
  letter: any;
  role: Role
}

const SpesificLetterSuamiIstri = (
  { letter, role }: SpesificLetterSuamiIstriProps
) => {

  const generatePdf = async () => {
    if (!letter || !letter.keteranganSuamiIstri) return;
    if (!letter.signature && role === "APPLICANT") return toast.error('Please wait signature to be added by the subdistrict officer');


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
        { text: 'Surat Keterangan Suami Istri', style: 'subheader', alignment: 'center', decoration: 'underline' },
        { text: 'Dengan hormat,', style: 'normal' },
        {
          text: `Yang bertanda tangan di bawah ini, kami Camat Jatiuwung, Kecamatan Jatiuwung,
          Kota Tangerang, menerangkan dengan sebenarnya kepada:`,
          style: 'normal',
          margin: [0, 10, 0, 0]
        },
        { text: `Nama Suami: ${letter.keteranganSuamiIstri.namaSuami}`, style: 'normal', margin: [16, 12, 0, 0] },
        { text: `NIK Suami: ${letter.keteranganSuamiIstri.nikSuami}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Tempat Lahir Suami: ${letter.keteranganSuamiIstri.tempatLahirSuami}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Tanggal Lahir Suami: ${formatDate(letter.keteranganSuamiIstri.tanggalLahirSuami)}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Agama Suami: ${letter.keteranganSuamiIstri.agamaSuami}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Pekerjaan Suami: ${letter.keteranganSuamiIstri.pekerjaanSuami}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Alamat Suami: ${letter.keteranganSuamiIstri.alamatSuami}`, style: 'normal', margin: [16, 8, 0, 0] },

        { text: `Nama Istri: ${letter.keteranganSuamiIstri.namaIstri}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `NIK Istri: ${letter.keteranganSuamiIstri.nikIstri}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Tempat Pernikahan: ${letter.keteranganSuamiIstri.tempatPernikahan}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Tanggal Pernikahan: ${formatDate(letter.keteranganSuamiIstri.tanggalPernikahan)}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Agama Istri: ${letter.keteranganSuamiIstri.agamaIstri}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Pekerjaan Istri: ${letter.keteranganSuamiIstri.pekerjaanIstri}`, style: 'normal', margin: [16, 8, 0, 0] },
        { text: `Alamat Istri: ${letter.keteranganSuamiIstri.alamatIstri}`, style: 'normal', margin: [16, 8, 0, 12] },
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
      `${letter.keteranganSuamiIstri.namaSuami}_SuratKeteranganSuamiIstri.pdf`
    );
  };


  return <DownloadPdf generatePdf={generatePdf} />
}

export default SpesificLetterSuamiIstri