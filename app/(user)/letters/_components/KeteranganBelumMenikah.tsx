import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { KeteranganBelumMenikah, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

interface KeteranganBelumMenikahProps extends Letter {
  keteranganBelumMenikah: KeteranganBelumMenikah;
  user: User;
  currentUser: User;
}

const BelumMenikah = ({ keteranganBelumMenikah, user,
  currentUser
}: KeteranganBelumMenikahProps) => {
  return (
    <TableRow>
      {currentUser.role === "APPLICANT" ? null :
        <TableCell>
          {user.username}
        </TableCell>
      }
      <TableCell>{keteranganBelumMenikah.nama}</TableCell>
      <TableCell>{keteranganBelumMenikah.tempatLahir}</TableCell>
      <TableCell>{formatDate(keteranganBelumMenikah.tanggalLahir)}</TableCell>
      <TableCell>{keteranganBelumMenikah.agama}</TableCell>
      <TableCell>{keteranganBelumMenikah.alamat}</TableCell>
      <TableCell>{keteranganBelumMenikah.pekerjaan}</TableCell>
      <TableCell>{keteranganBelumMenikah.nik}</TableCell>
      <TableCell>
        <Image
          src={keteranganBelumMenikah.fotoKtp}
          alt={keteranganBelumMenikah.nama}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        <Image
          src={keteranganBelumMenikah.fotoKk}
          alt="Foto KK"
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        <Image
          src={keteranganBelumMenikah.fotoAktaKelahiran}
          alt="Foto Akta Kelahiran"
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>{formatDate(keteranganBelumMenikah.createdAt)}</TableCell>
    </TableRow>
  );
};

export default BelumMenikah;
