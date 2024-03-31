import { deleteLetterWithId } from '@/actions/letter';
import AlertDialog from '@/components/custom-ui/AlertDialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { TinggalPenduduk, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React, { useTransition } from 'react';
import { toast } from 'sonner';
import ToggleApproveItem from './ToggleApproveItem';

interface TinggalPendudukProps extends Letter {
  tinggalPenduduk: TinggalPenduduk;
  user: User;
  currentUser: User;
}

const KeteranganTInggalPenduduk = ({ tinggalPenduduk, user, currentUser, id, approved }: TinggalPendudukProps) => {

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
      <TableCell>{tinggalPenduduk.nama}</TableCell>
      <TableCell>{tinggalPenduduk.nik}</TableCell>
      <TableCell>{tinggalPenduduk.tempatLahir}</TableCell>
      <TableCell>{formatDate(tinggalPenduduk.tanggalLahir)}</TableCell>
      <TableCell>{tinggalPenduduk.alamatAsal}</TableCell>
      <TableCell>{tinggalPenduduk.alamatSekarang}</TableCell>
      <TableCell>
        <Image
          src={tinggalPenduduk.fotoKtp}
          alt={tinggalPenduduk.nama}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        <Image
          src={tinggalPenduduk.fotoKk}
          alt={tinggalPenduduk.nama}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>{formatDate(tinggalPenduduk.createdAt)}</TableCell>
      {
        currentUser.role !== "APPLICANT" && (
          <>
            <ToggleApproveItem
              id={id}
              approved={approved}
            />
            <TableCell>
              <AlertDialog
                action={handleDelete}
                isPending={isPending}
                trigger={
                  isPending ? "Deleting..." : "Delete"
                }
              />
            </TableCell>
          </>
        )
      }
    </TableRow>
  );
};

export default KeteranganTInggalPenduduk;
