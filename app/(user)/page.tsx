"use client";
import { Heading } from "@/components/custom-ui/heading";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import FileSaver from "file-saver";
import { jsPDF } from "jspdf";
import Link from "next/link";

export default function Home() {
  const doc = new jsPDF();

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
    actualData.forEach((data, i) => {
      const pageWidth = doc.internal.pageSize.getWidth();
      const fontSize = 16;
      const titleWidth =
        (doc.getStringUnitWidth(data.title) * fontSize) /
        doc.internal.scaleFactor;

      const titleX = (pageWidth - titleWidth) / 2;

      doc.text(data.title, titleX, 10);

      doc.text(`Nama: ${data.nama}`, 10, 20);
      doc.text(`Tanggal Lahir: ${data.tanggalLahir}`, 10, 30);
      doc.text(`Tanggal Kematian: ${data.tanggalKematian}`, 10, 40);
      doc.text(`Tempat Kematian: ${data.tempatKematian}`, 10, 50);
      doc.text(`Penyebab Kematian: ${data.penyebabKematian}`, 10, 60);
    });

    doc.save("a4.pdf");
  };

  return (
    <>
      <Link href="/pdfmake">pdfmake</Link>
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
