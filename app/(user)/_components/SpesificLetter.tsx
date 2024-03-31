"use client"
import { Letter } from '@prisma/client';
import React from 'react'
import DownloadPdf from './DownloadPdf';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const SpesificLetter = (
  { letter }: any
) => {

  const generatePdf = async () => {
    if (!letter || !letter.domisiliUsaha) return;
    const fetchImage = async (url: string) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    const fotoKtpUrl = await fetchImage(letter.domisiliUsaha.fotoKtp);
    const fotoUsahaUrl = await fetchImage(letter.domisiliUsaha.fotoUsaha);
    const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/2/20/Lambang_Daerah_Kabupaten_Tangerang.png';
    const logo = await fetchImage(logoUrl);
    const documentDefinition = {
      header: {
        columns: [
          { image: logo, width: 42 },
          {
            text: 'KEPALA LINGKUNGAN SIDANGKAL V KEL.',
            alignment: 'center',
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 0]
          },
        ],
        margin: [0, 20, 0, 26]
      },
      content: [
        { text: 'SURAT PERMOHONAN IZIN USAHA', style: 'header' },
        { text: 'Kepada Yth. Bapak/Ibu Camat ... Di tempat,', style: 'subheader' },
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
        { text: 'Demikianlah surat permohonan izin usaha ini kami buat. Atas perhatian dan bantuannya, kami mengucapkan terima kasih.', style: 'normal' },
        { text: 'Hormat kami,', style: 'normal' },
        { text: '[Tanda Tangan]', style: 'normal' },
        { text: letter.domisiliUsaha.pemilikUsaha, style: 'normal' }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20]
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