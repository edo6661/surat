"use client"
import { Letter } from '@prisma/client';
import React from 'react'
import DownloadPdf from './DownloadPdf';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { fetchImageBlob } from '@/utils/fetchImageBlob';
import { formatDate } from '@/utils/formateDate';
import { logoUrl } from '@/constants';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const SpesificLetter = (
  { letter }: any
) => {

  const generatePdf = async () => {
    if (!letter || !letter.domisiliUsaha) return;


    const fotoKtpUrl = await fetchImageBlob(letter.domisiliUsaha.fotoKtp);
    const fotoUsahaUrl = await fetchImageBlob(letter.domisiliUsaha.fotoUsaha);
    const logo = await fetchImageBlob(logoUrl);
    const letterSignature = await fetchImageBlob(letter.signature);
    const documentDefinition = {
      header: {
        columns: [
          { image: logo, width: 42, margin: [20, 0, 0, 0] },
          {
            text: 'KEPALA LINGKUNGAN SIDANGKAL V KEL.',
            alignment: 'center',
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 0]
          },

        ],
        margin: [0, 20, 0, 20]
      },
      content: [
        { text: 'Kecamatan Jatiwung Kota Tangerang', style: 'header' },
        {
          text: "Jl. Gatot Subroto No.22-30, Keroncong, Jatiuwung, Kota Tangerang, Banten 15134",
          alignment: 'center',
          fontSize: 10,
          margin: [0, 0, 0, 5]
        },
        {
          text: "021-5585268",
          alignment: 'center',
          fontSize: 8,
        },

        {
          canvas: [{ type: 'line', x1: 0, y1: 0, x2: 595.28 - 40, y2: 0, lineWidth: 1, }],
          margin: [0, 10, 0, 10]
        },
        { text: 'Surat Permohonan Izin Usaha', style: 'subheader', alignment: 'center' },
        { text: 'Dengan hormat,', style: 'normal' },
        { text: `Sehubungan dengan rencana kami untuk membuka usaha di ${letter.domisiliUsaha.alamatUsaha}, kami yang bertanda tangan di bawah ini:`, style: 'normal' },
        { text: `Nama Pemilik Usaha: ${letter.domisiliUsaha.pemilikUsaha}`, style: 'normal' },
        { text: `Alamat Usaha: ${letter.domisiliUsaha.alamatUsaha}`, style: 'normal' },
        { text: `Jenis Usaha: ${letter.domisiliUsaha.jenisUsaha}`, style: 'normal' },
        { text: `Nama Usaha: ${letter.domisiliUsaha.namaUsaha}`, style: 'normal' },
        { text: `NIK: ${letter.domisiliUsaha.nik}`, style: 'normal' },
        { text: 'Dengan ini, kami mengajukan permohonan izin kepada Bapak/Ibu Camat untuk membuka usaha tersebut. Sebagai bukti identitas dan keabsahan, kami lampirkan:', style: 'normal' },
        // {
        //   ul: [
        //     'Foto KTP Pemilik Usaha:',
        //     { image: fotoKtpUrl, width: 200 },
        //     'Foto Usaha:',
        //     { image: fotoUsahaUrl, width: 200 }
        //   ]
        // },
        { text: 'Demikianlah surat permohonan izin usaha ini kami buat. Atas perhatian dclearan bantuannya, kami mengucapkan terima kasih.', style: 'normal' },
        { text: 'Hormat kami,', style: 'normal' },
        { text: `Kota Tangerang ${formatDate(letter.createdAt)}`, style: 'normal', alignment: 'right' },
        { text: `Yang Menyatakan`, style: 'normal', alignment: 'right' },
        letterSignature ?
          { image: letterSignature, width: 120, alignment: 'right', margin: [0, 40, 0, 40] } :
          { text: '( ___________________________ )', margin: [0, 40, 0, 40], alignment: 'right' }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10]
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
      `${letter.domisiliUsaha.pemilikUsaha}_SuratPermohonanIzinUsaha.pdf`
    );
  };


  return <DownloadPdf generatePdf={generatePdf} />
}

export default SpesificLetter