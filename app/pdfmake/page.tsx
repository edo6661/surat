"use client";
import { Heading } from "@/components/custom-ui/heading";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Home() {
  const actualData = [
    {
      title: "Surat Kematian",
      nama: "John Doe",
      tanggalLahir: "1 Januari 1970",
      tanggalKematian: "1 Januari 2024",
      tempatKematian: "Monokerto",
      penyebabKematian: "Penyakit jantung",
    },
  ];

  const onClick = () => {
    actualData.forEach((data) => {
      const docDefinition = {
        content: [
          { text: data.title, fontSize: 16, bold: true, margin: [0, 0, 0, 8] },
          { text: `Nama: ${data.nama}`, fontSize: 14, margin: [0, 0, 0, 5] },
          {
            text: `Tanggal Lahir: ${data.tanggalLahir}`,
            fontSize: 14,
            margin: [0, 0, 0, 5],
          },
          {
            text: `Tanggal Kematian: ${data.tanggalKematian}`,
            fontSize: 14,
            margin: [0, 0, 0, 5],
          },
          {
            text: `Tempat Kematian: ${data.tempatKematian}`,
            fontSize: 14,
            margin: [0, 0, 0, 5],
          },
          {
            text: `Penyebab Kematian: ${data.penyebabKematian}`,
            fontSize: 14,
            margin: [0, 0, 0, 5],
          },
        ],
      };
      pdfMake
        // @ts-ignore
        .createPdf(docDefinition)
        .download(`${data.nama}_SuratKematian.pdf`);
    });
  };

  return (
    <>
      <Link href="/">Home</Link>
      <div className="container pt-2 pb-4 bg-neutral-200/20">
        {actualData.map((data) => {
          return (
            <div className="space-y-4" key={data.nama}>
              <Image
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjxX-Dt1zxzkcws_hgVJ5YOr0xrm6ng3gzAxmaU_AaTr9iInUEfzYCsMULIvFPDzOZHQhZCjXDo83hKRC0evb70s20pQBYSl_6vkP-1p2ah5WyPD6Yaa2gvG_VWVW5DJOgvejUJsUIWo0s/s400/idn_emb_idezia.com.png"
                alt="Logo"
                width={100}
                height={100}
                className="mx-auto"
              />
              <Heading className="text-center">{data.title}</Heading>
              <p>Nama: {data.nama}</p>
              <p>Tanggal Lahir: {data.tanggalLahir}</p>
              <p>Tanggal Kematian: {data.tanggalKematian}</p>
              <p>Tempat Kematian: {data.tempatKematian}</p>
              <p>Penyebab Kematian: {data.penyebabKematian}</p>
            </div>
          );
        })}
        <Button onClick={onClick}>Download Pdf</Button>
      </div>
    </>
  );
}
