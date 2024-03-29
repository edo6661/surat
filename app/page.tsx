"use client";
import { Heading } from "@/components/custom-ui/heading";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import FileSaver from "file-saver";

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

  const downloadPDF = async () => {
    try {
      const response = await axios.get("/api", { responseType: "blob" });
      const blob = new Blob([response.data], { type: "application/pdf" });
      FileSaver.saveAs(blob, "mypdf.pdf");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
        <Button onClick={downloadPDF}>Download Pdf</Button>
      </div>
    </>
  );
}
