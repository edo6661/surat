import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { DomisiliUsaha, Letter, User } from '@prisma/client'
import Image from 'next/image';
import React from 'react'
interface DomisiliUsahaProps extends Letter {
  domisiliUsaha: DomisiliUsaha;
  user: User;
  currentUser: User;
}
const DomisiliUsaha = (
  { domisiliUsaha, user, currentUser }: DomisiliUsahaProps
) => {
  return (
    <TableRow>
      {currentUser.role === "APPLICANT" ? null :
        <TableCell>
          {user.username}
        </TableCell>
      }
      <TableCell>
        {domisiliUsaha.pemilikUsaha}
      </TableCell>
      <TableCell>
        {domisiliUsaha.alamatUsaha}
      </TableCell>
      <TableCell>
        {domisiliUsaha.jenisUsaha}
      </TableCell>
      <TableCell>
        {domisiliUsaha.namaUsaha}
      </TableCell>
      <TableCell>
        {domisiliUsaha.nik}
      </TableCell>
      <TableCell>
        <Image
          src={domisiliUsaha.fotoKtp}
          alt={domisiliUsaha.pemilikUsaha}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        <Image
          src={domisiliUsaha.fotoUsaha}
          alt={domisiliUsaha.namaUsaha}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        {formatDate(domisiliUsaha.createdAt)}
      </TableCell>
    </TableRow>
  )
}

export default DomisiliUsaha