import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { PengantarSKCK, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

interface PengantarSKCKProps extends Letter {
  pengantarSKCK: PengantarSKCK;
  user: User;
  currentUser: User;
}

const PengantarSKCK = ({ pengantarSKCK, user, currentUser }: PengantarSKCKProps) => {
  return (
    <TableRow>
      {currentUser.role === "APPLICANT" ? null :
        <TableCell>
          {user.username}
        </TableCell>
      }
      <TableCell>{pengantarSKCK.nama}</TableCell>
      <TableCell>{pengantarSKCK.nik}</TableCell>
      <TableCell>{pengantarSKCK.jenisKelamin}</TableCell>
      <TableCell>{pengantarSKCK.tempatLahir}</TableCell>
      <TableCell>{formatDate(pengantarSKCK.tanggalLahir)}</TableCell>
      <TableCell>{pengantarSKCK.alamat}</TableCell>
      <TableCell>{pengantarSKCK.pekerjaan}</TableCell>
      <TableCell>{pengantarSKCK.keperluan}</TableCell>
      <TableCell>
        <Image
          src={pengantarSKCK.fotoKtp}
          alt={pengantarSKCK.nama}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>{formatDate(pengantarSKCK.createdAt)}</TableCell>
    </TableRow>
  );
};

export default PengantarSKCK;
