import { deleteLetterWithId } from '@/actions/letter';
import AlertDialog from '@/components/custom-ui/AlertDialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { Kematian, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

interface KematianProps extends Letter {
  kematian: Kematian;
  user: User;
  currentUser: User;
}

const KeteranganKematian = ({ kematian, user, id, currentUser }: KematianProps) => {

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

export default KeteranganKematian;
