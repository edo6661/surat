import { deleteLetterWithId } from '@/actions/letter';
import AlertDialog from '@/components/custom-ui/AlertDialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { KeteranganUsaha, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

interface KeteranganUsahaProps extends Letter {
  keteranganUsaha: KeteranganUsaha;
  user: User;
  currentUser: User;
}

const Usaha = ({ keteranganUsaha, user, currentUser, id }: KeteranganUsahaProps) => {

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

export default Usaha;
