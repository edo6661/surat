import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { KeteranganUsaha, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

interface KeteranganUsahaProps extends Letter {
  keteranganUsaha: KeteranganUsaha;
  user: User;
  currentUser: User;
}

const Usaha = ({ keteranganUsaha, user, currentUser }: KeteranganUsahaProps) => {
  return (
    <TableRow>
      {currentUser.role === "APPLICANT" ? null :
        <TableCell>
          {user.username}
        </TableCell>
      }

      <TableCell>{keteranganUsaha.nama}</TableCell>
      <TableCell>{keteranganUsaha.nik}</TableCell>
      <TableCell>{keteranganUsaha.tempatLahir}</TableCell>
      <TableCell>{formatDate(keteranganUsaha.tanggalLahir)}</TableCell>
      <TableCell>{keteranganUsaha.agama}</TableCell>
      <TableCell>{keteranganUsaha.pekerjaan}</TableCell>
      <TableCell>{keteranganUsaha.alamat}</TableCell>
      <TableCell>
        <Image
          src={keteranganUsaha.fotoUsaha}
          alt={keteranganUsaha.namaUsaha}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>{keteranganUsaha.namaUsaha}</TableCell>
      <TableCell>{keteranganUsaha.jenisUsaha}</TableCell>
      <TableCell>{keteranganUsaha.lokasiUsaha}</TableCell>
      <TableCell>
        <Image
          src={keteranganUsaha.fotoKtp}
          alt={keteranganUsaha.nama}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>{formatDate(keteranganUsaha.createdAt)}</TableCell>
    </TableRow>
  );
};

export default Usaha;
