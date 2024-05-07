
import { Heading } from '@/components/custom-ui/heading'
import { getLetterById } from '@/services/letter'
import Image from 'next/image'
import React from 'react'
import SpesificLetter from '../../_components/SpesificLetter';
import { logoUrl } from '@/constants';
import { formatDate } from '@/utils/formateDate';
import Signature from '../../_components/Signature';
import { getCurrentUser } from '@/services/user';


interface LetterPageProps {
  params: {
    domisiliUsahaId: string
  }
}
const LetterPage = async (
  { params: { domisiliUsahaId } }: LetterPageProps
) => {
  // TODO: Fetch letter data
  const letter = await getLetterById(domisiliUsahaId)
  const currentUser = await getCurrentUser()

  return (
    <section className='base-container'>
      <div className="fl-ic">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Lambang_Kota_Tangerang.png/640px-Lambang_Kota_Tangerang.png"
          alt='Logo'
          width={68}
          height={68}
        />
        <div className="fl-ic flex-col justify-center  break-words mx-auto">
          <Heading className='max-w-[500px]'>
            Kecamatan Jatiuwung Kota Tangerang
          </Heading>
          <p className='text-muted-foreground text-sm text-center max-w-[420px]'>
            Jl. Gatot Subroto No.22-30, Keroncong, Jatiuwung, Kota Tangerang, Banten 15134
          </p>
          <p className='text-muted-foreground text-sm text-center max-w-[420px]'>
            021-5585268
          </p>
        </div>
      </div>
      <hr className='my-4 w-full h-[2px] bg-black' />
      {letter ? (
        <>
          <div>

          </div>
          {letter.domisiliUsaha && (
            <div className='space-y-4'>
              <Heading as="h4" size="sm" className='text-center'>
                Surat Permohonan Izin Usaha
              </Heading>
              <div className="">
                <div className="space-y-2 my-2">
                  <p>Dengan hormat,</p>
                  <p>Sehubungan dengan rencana kami untuk membuka usaha di {letter.domisiliUsaha.alamatUsaha}, kami yang bertanda tangan di bawah ini:</p>
                </div>
                <p>Nama Pemilik Usaha: {letter.domisiliUsaha.pemilikUsaha}</p>
                <p>Alamat Usaha: {letter.domisiliUsaha.alamatUsaha}</p>
                <p>Jenis Usaha: {letter.domisiliUsaha.jenisUsaha}</p>
                <p>Nama Usaha: {letter.domisiliUsaha.namaUsaha}</p>
                <p>NIK: {letter.domisiliUsaha.nik}</p>
              </div>
              <p>Dengan ini, kami mengajukan permohonan izin kepada Bapak/Ibu Camat untuk membuka usaha tersebut. Sebagai bukti identitas dan keabsahan, kami lampirkan:</p>

              <p>Demikianlah surat permohonan izin usaha ini kami buat. Atas perhatian dan bantuannya, kami mengucapkan terima kasih.</p>
              <p>Hormat kami,</p>
              <div className="flex flex-col ml-auto gap-2 max-w-[217px] text-center">
                <p>Kota Tangerang {formatDate(
                  letter.createdAt
                )}</p>
                <p>Yang Menyatakan</p>

                {
                  letter.signature ? (
                    <Image
                      src={letter.signature}
                      alt='Signature'
                      width={215}
                      height={215}
                      className='mx-auto'
                    />
                  ) :
                    <Signature
                      id={letter.id}
                      currentUser={currentUser!}
                    />
                }


                <p>  ___________________________ </p>
              </div>
              <SpesificLetter
                letter={letter}
                role={currentUser!.role}
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