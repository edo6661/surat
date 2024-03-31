import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { Kelahiran, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

interface KelahiranProps extends Letter {
  kelahiran: Kelahiran;
  user: User;
  currentUser: User;
}

const Kelahiran = ({ kelahiran, user, currentUser }: KelahiranProps) => {
  return (
    <TableRow>
      {currentUser.role === "APPLICANT" ? null :
        <TableCell>
          {user.username}
        </TableCell>
      }      <TableCell>{kelahiran.jenisKelamin}</TableCell>
      <TableCell>{formatDate(kelahiran.tanggalLahir)}</TableCell>
      <TableCell>{kelahiran.tempatLahir}</TableCell>
      <TableCell>{kelahiran.agama}</TableCell>
      <TableCell>{kelahiran.namaAyah}</TableCell>
      <TableCell>{kelahiran.tempatLahirAyah}</TableCell>
      <TableCell>{formatDate(kelahiran.tanggalLahirAyah)}</TableCell>
      <TableCell>{kelahiran.agamaAyah}</TableCell>
      <TableCell>{kelahiran.pekerjaanAyah}</TableCell>
      <TableCell>{kelahiran.namaIbu}</TableCell>
      <TableCell>{kelahiran.tempatLahirIbu}</TableCell>
      <TableCell>{formatDate(kelahiran.tanggalLahirIbu)}</TableCell>
      <TableCell>{kelahiran.agamaIbu}</TableCell>
      <TableCell>{kelahiran.pekerjaanIbu}</TableCell>
      <TableCell>
        <Image
          src={kelahiran.fotoKtpAyah}
          alt={kelahiran.namaAyah}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        <Image
          src={kelahiran.fotoKtpIbu}
          alt={kelahiran.namaIbu}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        <Image
          src={kelahiran.fotoKk}
          alt="Foto KK"
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>{formatDate(kelahiran.createdAt)}</TableCell>
    </TableRow>
  );
};

export default Kelahiran;
