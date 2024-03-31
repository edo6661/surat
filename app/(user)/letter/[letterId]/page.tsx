
import { Heading } from '@/components/custom-ui/heading'
import { getLetterById } from '@/services/letter'
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button';
import SpesificLetter from '../../_components/SpesificLetter';

interface LetterPageProps {
  params: {
    letterId: string
  }
}
const LetterPage = async (
  { params: { letterId } }: LetterPageProps
) => {
  // TODO: Fetch letter data
  const letter = await getLetterById(letterId)

  return (
    <section className='base-container'>
      <Heading>
        {letterId}
      </Heading>
      {letter ? (
        <>
          <div>
            <p>Alamat Camat: ...</p>
            <p>Alamat Kantor Pos: ...</p>
            <p>Alamat Email: ...</p>
            <p>No. Telepon: ...</p>
            <p>No. Fax: ...</p>
            <p>Tanggal: ...</p>
          </div>
          {letter.domisiliUsaha && (
            <div>
              <p>Kepada Yth. Bapak/Ibu Camat ... Di tempat,</p>
              <p>Dengan hormat,</p>
              <p>Sehubungan dengan rencana kami untuk membuka usaha di {letter.domisiliUsaha.alamatUsaha}, kami yang bertanda tangan di bawah ini:</p>
              <p>Nama Pemilik Usaha: {letter.domisiliUsaha.pemilikUsaha}</p>
              <p>Alamat Usaha: {letter.domisiliUsaha.alamatUsaha}</p>
              <p>Jenis Usaha: {letter.domisiliUsaha.jenisUsaha}</p>
              <p>Nama Usaha: {letter.domisiliUsaha.namaUsaha}</p>
              <p>NIK: {letter.domisiliUsaha.nik}</p>
              <p>Dengan ini, kami mengajukan permohonan izin kepada Bapak/Ibu Camat untuk membuka usaha tersebut. Sebagai bukti identitas dan keabsahan, kami lampirkan:</p>
              <p>Foto KTP Pemilik Usaha: </p>
              <Image
                src={letter.domisiliUsaha.fotoKtp}
                alt='Foto KTP Pemilik Usaha'
                width={120}
                height={120} />
              <p>Foto Usaha:</p>
              <Image
                src={letter.domisiliUsaha.fotoUsaha}
                alt='Foto Usaha'
                width={120}
                height={120}
              />
              <p>Demikianlah surat permohonan izin usaha ini kami buat. Atas perhatian dan bantuannya, kami mengucapkan terima kasih.</p>
              <p>Hormat kami,</p>
              <p>[Tanda Tangan]<br />{letter.domisiliUsaha.pemilikUsaha}</p>
              <SpesificLetter
                letter={letter}
              />
            </div>
          )}
        </>
      ) : <Heading>
        Loading
      </Heading>}
    </section>
  )
}

export default LetterPage