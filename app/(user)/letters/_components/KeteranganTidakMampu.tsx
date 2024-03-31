import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { TidakMampu, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

interface TidakMampuProps extends Letter {
  tidakMampu: TidakMampu;
  user: User;
  currentUser: User;
}

const KeteranganTidakMampu = ({ tidakMampu, user, currentUser }: TidakMampuProps) => {
  return (
    <TableRow>
      {currentUser.role === "APPLICANT" ? null :
        <TableCell>
          {user.username}
        </TableCell>
      }
      <TableCell>{tidakMampu.nama}</TableCell>
      <TableCell>{tidakMampu.nik}</TableCell>
      <TableCell>{tidakMampu.jenisKelamin}</TableCell>
      <TableCell>{tidakMampu.tempatLahir}</TableCell>
      <TableCell>{formatDate(tidakMampu.tanggalLahir)}</TableCell>
      <TableCell>{tidakMampu.agama}</TableCell>
      <TableCell>{tidakMampu.alasanTidakMampu}</TableCell>
      <TableCell>{tidakMampu.pendapatan}</TableCell>
      <TableCell>{tidakMampu.alamat}</TableCell>
      <TableCell>{tidakMampu.pekerjaan}</TableCell>
      <TableCell>
        <Image
          src={tidakMampu.fotoKtp}
          alt={tidakMampu.nama}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        <Image
          src={tidakMampu.fotoRumah}
          alt="Foto Rumah"
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>{tidakMampu.keperluan}</TableCell>
      <TableCell>{formatDate(tidakMampu.createdAt)}</TableCell>
    </TableRow>
  );
};

export default KeteranganTidakMampu;
