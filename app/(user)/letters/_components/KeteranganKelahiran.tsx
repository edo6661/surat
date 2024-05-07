import { deleteLetterWithId, updateReasonLetterWithId } from '@/actions/letter';
import AlertDialog from '@/components/custom-ui/AlertDialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { Kelahiran, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';
import ToggleApproveItem from './ToggleApproveItem';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import DialogReason from './DialogReason';
import { Input } from '@/components/ui/input';

interface KelahiranProps extends Letter {
  kelahiran: Kelahiran;
  user: User;
  currentUser: User;
}

const KeteranganKelahiran = ({ kelahiran, user, currentUser, id, approved, reason }: KelahiranProps) => {

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
  const redirectToLetter = () => router.push(`/kelahiran/${id}`)

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
      <TableCell>{kelahiran.jenisKelamin}</TableCell>
      <TableCell>{formatDate(kelahiran.tanggalLahir)}</TableCell>
      <TableCell>{kelahiran.tempatLahir}</TableCell>
      <TableCell>{kelahiran.agama}</TableCell>
      <TableCell>{kelahiran.namaAyah}</TableCell>
      <TableCell>{kelahiran.tempatLahirAyah}</TableCell>
      <TableCell>{formatDate(kelahiran.tanggalLahirAyah)}</TableCell>
      <TableCell>{kelahiran.agamaAyah}</TableCell>
      <TableCell>{kelahiran.pekerjaanAyah}</TableCell>
      <TableCell>{kelahiran.namaIbu}</TableCell>
      <TableCell>{kelahiran.tempatLahirIbu}</TableCell>
      <TableCell>{formatDate(kelahiran.tanggalLahirIbu)}</TableCell>
      <TableCell>{kelahiran.agamaIbu}</TableCell>
      <TableCell>{kelahiran.pekerjaanIbu}</TableCell>
      <TableCell>
        <Image
          src={kelahiran.fotoKtpAyah}
          alt={kelahiran.namaAyah}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        <Image
          src={kelahiran.fotoKtpIbu}
          alt={kelahiran.namaIbu}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        <Image
          src={kelahiran.fotoKk}
          alt="Foto KK"
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>{formatDate(kelahiran.createdAt)}</TableCell>
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

export default KeteranganKelahiran;
