import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { TidakMampuSekolah, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

interface TidakMampuSekolahProps extends Letter {
  tidakMampuSekolah: TidakMampuSekolah;
  user: User;
  currentUser: User;
}

const KeteranganTidakMampuSekolah = ({ tidakMampuSekolah, user, currentUser }: TidakMampuSekolahProps) => {
  return (
    <TableRow>
      {currentUser.role === "APPLICANT" ? null :
        <TableCell>
          {user.username}
        </TableCell>
      }
      <TableCell>{tidakMampuSekolah.nama}</TableCell>
      <TableCell>{tidakMampuSekolah.tempatLahir}</TableCell>
      <TableCell>{formatDate(tidakMampuSekolah.tanggalLahir)}</TableCell>
      <TableCell>{tidakMampuSekolah.jenisKelamin}</TableCell>
      <TableCell>{tidakMampuSekolah.agama}</TableCell>
      <TableCell>{tidakMampuSekolah.alamat}</TableCell>
      <TableCell>{tidakMampuSekolah.alasanTidakMampu}</TableCell>
      <TableCell>{tidakMampuSekolah.namaAyah}</TableCell>
      <TableCell>{tidakMampuSekolah.nikAyah}</TableCell>
      <TableCell>{tidakMampuSekolah.tempatLahirAyah}</TableCell>
      <TableCell>{formatDate(tidakMampuSekolah.tanggalLahirAyah)}</TableCell>
      <TableCell>{tidakMampuSekolah.agamaAyah}</TableCell>
      <TableCell>{tidakMampuSekolah.pekerjaanAyah}</TableCell>
      <TableCell>
        <Image
          src={tidakMampuSekolah.fotoKtpAyah}
          alt={tidakMampuSekolah.namaAyah}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        <Image
          src={tidakMampuSekolah.fotoRumah}
          alt="Foto Rumah"
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>{formatDate(tidakMampuSekolah.createdAt)}</TableCell>
    </TableRow>
  );
};

export default KeteranganTidakMampuSekolah;
