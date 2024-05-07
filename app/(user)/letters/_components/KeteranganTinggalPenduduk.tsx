import { deleteLetterWithId, updateReasonLetterWithId } from '@/actions/letter';
import AlertDialog from '@/components/custom-ui/AlertDialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { TinggalPenduduk, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';
import ToggleApproveItem from './ToggleApproveItem';
import { Button } from '@/components/ui/button';
import DialogReason from './DialogReason';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

interface TinggalPendudukProps extends Letter {
  tinggalPenduduk: TinggalPenduduk;
  user: User;
  currentUser: User;
}

const KeteranganTInggalPenduduk = ({ tinggalPenduduk, user, currentUser, id, approved, reason }: TinggalPendudukProps) => {

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
  const [alasan, setAlasan] = useState(reason ?? "");

  const handleReason = async () => {
    startTransition(() => {
      updateReasonLetterWithId(id, alasan)
        .then((data) => {
          toast.success(`Reason has been Successfully Changed`);
        })
        .catch((err) => {
          console.error(err);
          toast.error(`Failed to add reason: ${err.message}`);
        });
    });
  }

  const router = useRouter();
  const redirectToLetter = () => router.push(`/tinggal-penduduk/${id}`)


  return (
    <TableRow
      onClick={redirectToLetter}
      className='cursor-pointer'
    >
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
        currentUser.role === "APPLICANT" && (
          <>
            <TableCell>
              <Button variant={approved ? "default" : "destructive"} size="sm" className=' select-none'>
                {approved ? "Approved" : "Pending"}
              </Button>
            </TableCell>
            <TableCell>
              {reason ? reason : "No reason"}
            </TableCell>
          </>
        )
      }
      {
        currentUser.role !== "APPLICANT" && (
          <>
            <ToggleApproveItem
              id={id}
              approved={approved}
            />
            <TableCell
              onClick={(e) => e.stopPropagation()}
            >
              <DialogReason
                isPending={isPending}
                trigger='Reason'
                action={handleReason}
              >
                <Input
                  value={alasan}
                  onChange={(e) => setAlasan(e.target.value)}
                  placeholder="Add Reason"
                />
              </DialogReason>
            </TableCell>
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
