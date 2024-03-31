import { deleteLetterWithId } from '@/actions/letter';
import AlertDialog from '@/components/custom-ui/AlertDialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { DomisiliUsaha, Letter, User } from '@prisma/client'
import Image from 'next/image';
import React, { useTransition } from 'react'
import { toast } from 'sonner';
interface DomisiliUsahaProps extends Letter {
  domisiliUsaha: DomisiliUsaha;
  user: User;
  currentUser: User;
}
const KeteranganDomisiliUsaha = (
  { domisiliUsaha, user, currentUser, id }: DomisiliUsahaProps
) => {
  const [isPending, startTransition] = useTransition();
  const handleDelete = async () => {
    startTransition(() => {
      deleteLetterWithId(id)
        .then((data) => {
          toast.success(`Data ${user.username} has been deleted`);
        })
        .catch((err) => {
          console.error(err);
          toast.error(`Failed to delete data: ${err.message}`);
        });
    });
  };




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
      {currentUser.role !== "APPLICANT" && (
        <TableCell>
          <AlertDialog
            action={handleDelete}
            isPending={isPending}
            trigger={
              isPending ? "Deleting..." : "Delete"
            }
          />
        </TableCell>
      )}
    </TableRow>
  )
}

export default KeteranganDomisiliUsaha