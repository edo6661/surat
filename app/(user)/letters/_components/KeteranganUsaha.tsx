import { deleteLetterWithId, updateReasonLetterWithId } from '@/actions/letter';
import AlertDialog from '@/components/custom-ui/AlertDialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { KeteranganUsaha, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';
import ToggleApproveItem from './ToggleApproveItem';
import DialogReason from './DialogReason';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface KeteranganUsahaProps extends Letter {
  keteranganUsaha: KeteranganUsaha;
  user: User;
  currentUser: User;
}

const Usaha = ({ keteranganUsaha, user, currentUser, id, approved, reason }: KeteranganUsahaProps) => {

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

  const router = useRouter()
  const redirectToLetter = () => router.push(`/usaha/${id}`)

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

export default Usaha;
