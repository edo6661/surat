import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { KeteranganSuamiIstri, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

interface KeteranganSuamiIstriProps extends Letter {
  keteranganSuamiIstri: KeteranganSuamiIstri;
  user: User;
  currentUser: User;
}

const KeteranganSuamiIstri = ({ keteranganSuamiIstri, user, currentUser }: KeteranganSuamiIstriProps) => {
  return (
    <TableRow>
      {currentUser.role === "APPLICANT" ? null :
        <TableCell>
          {user.username}
        </TableCell>
      }
      <TableCell>{keteranganSuamiIstri.namaSuami}</TableCell>
      <TableCell>{keteranganSuamiIstri.nikSuami}</TableCell>
      <TableCell>{keteranganSuamiIstri.tempatLahirSuami}</TableCell>
      <TableCell>{formatDate(keteranganSuamiIstri.tanggalLahirSuami)}</TableCell>
      <TableCell>{keteranganSuamiIstri.agamaSuami}</TableCell>
      <TableCell>{keteranganSuamiIstri.alamatSuami}</TableCell>
      <TableCell>{keteranganSuamiIstri.pekerjaanSuami}</TableCell>
      <TableCell>{keteranganSuamiIstri.namaIstri}</TableCell>
      <TableCell>{keteranganSuamiIstri.nikIstri}</TableCell>
      <TableCell>{keteranganSuamiIstri.tempatPernikahan}</TableCell>
      <TableCell>{formatDate(keteranganSuamiIstri.tanggalPernikahan)}</TableCell>
      <TableCell>{keteranganSuamiIstri.agamaIstri}</TableCell>
      <TableCell>{keteranganSuamiIstri.alamatIstri}</TableCell>
      <TableCell>{keteranganSuamiIstri.pekerjaanIstri}</TableCell>
      <TableCell>
        <Image
          src={keteranganSuamiIstri.fotoKtpSuami}
          alt={keteranganSuamiIstri.namaSuami}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        <Image
          src={keteranganSuamiIstri.fotoKtpIstri}
          alt={keteranganSuamiIstri.namaIstri}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        <Image
          src={keteranganSuamiIstri.fotoBukuNikah}
          alt="Foto Buku Nikah"
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>{formatDate(keteranganSuamiIstri.createdAt)}</TableCell>
    </TableRow>
  );
};

export default KeteranganSuamiIstri;
