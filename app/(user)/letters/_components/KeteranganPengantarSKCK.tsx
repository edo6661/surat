import { deleteLetterWithId } from '@/actions/letter';
import AlertDialog from '@/components/custom-ui/AlertDialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { PengantarSKCK, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

interface PengantarSKCKProps extends Letter {
  pengantarSKCK: PengantarSKCK;
  user: User;
  currentUser: User;
}

const KeteranganPengantarSKCK = ({ pengantarSKCK, user, currentUser, id }: PengantarSKCKProps) => {

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
      {
        currentUser.role !== "APPLICANT" && (
          <TableCell>
            <AlertDialog
              action={handleDelete}
              isPending={isPending}
              trigger={
                isPending ? "Deleting..." : "Delete"
              }
            />
          </TableCell>
        )
      }
    </TableRow>
  );
};

export default KeteranganPengantarSKCK;
