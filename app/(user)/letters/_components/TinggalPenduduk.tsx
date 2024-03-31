import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { TinggalPenduduk, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

interface TinggalPendudukProps extends Letter {
  tinggalPenduduk: TinggalPenduduk;
  user: User;
  currentUser: User;
}

const TinggalPenduduk = ({ tinggalPenduduk, user, currentUser }: TinggalPendudukProps) => {
  return (
    <TableRow>
      {currentUser.role === "APPLICANT" ? null :
        <TableCell>
          {user.username}
        </TableCell>
      }
      <TableCell>{tinggalPenduduk.nama}</TableCell>
      <TableCell>{tinggalPenduduk.nik}</TableCell>
      <TableCell>{tinggalPenduduk.tempatLahir}</TableCell>
      <TableCell>{formatDate(tinggalPenduduk.tanggalLahir)}</TableCell>
      <TableCell>{tinggalPenduduk.alamatAsal}</TableCell>
      <TableCell>{tinggalPenduduk.alamatSekarang}</TableCell>
      <TableCell>
        <Image
          src={tinggalPenduduk.fotoKtp}
          alt={tinggalPenduduk.nama}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        <Image
          src={tinggalPenduduk.fotoKk}
          alt={tinggalPenduduk.nama}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>{formatDate(tinggalPenduduk.createdAt)}</TableCell>
    </TableRow>
  );
};

export default TinggalPenduduk;
