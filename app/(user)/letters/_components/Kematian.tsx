import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { Kematian, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

interface KematianProps extends Letter {
  kematian: Kematian;
  user: User;
  currentUser: User;
}

const Kematian = ({ kematian, user, currentUser }: KematianProps) => {
  return (
    <TableRow>
      {currentUser.role === "APPLICANT" ? null :
        <TableCell>
          {user.username}
        </TableCell>
      }
      <TableCell>{kematian.nama}</TableCell>
      <TableCell>{kematian.nik}</TableCell>
      <TableCell>{formatDate(kematian.tanggalLahir)}</TableCell>
      <TableCell>{formatDate(kematian.tanggalKematian)}</TableCell>
      <TableCell>{kematian.tempatLahir}</TableCell>
      <TableCell>{kematian.jenisKelamin}</TableCell>
      <TableCell>{kematian.alamat}</TableCell>
      <TableCell>{kematian.agama}</TableCell>
      <TableCell>{kematian.pekerjaan}</TableCell>
      <TableCell>{kematian.alamatKematian}</TableCell>
      <TableCell>{kematian.tempatKematian}</TableCell>
      <TableCell>
        <Image
          src={kematian.fotoKtp}
          alt={kematian.nama}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        <Image
          src={kematian.fotoKk}
          alt="Foto KK"
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>{formatDate(kematian.createdAt)}</TableCell>
    </TableRow>
  );
};

export default Kematian;
