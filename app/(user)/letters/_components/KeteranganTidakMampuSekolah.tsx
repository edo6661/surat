import { deleteLetterWithId, updateReasonLetterWithId } from '@/actions/letter';
import AlertDialog from '@/components/custom-ui/AlertDialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { TidakMampuSekolah, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';
import ToggleApproveItem from './ToggleApproveItem';
import { Button } from '@/components/ui/button';
import DialogReason from './DialogReason';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

interface TidakMampuSekolahProps extends Letter {
  tidakMampuSekolah: TidakMampuSekolah;
  user: User;
  currentUser: User;
}

const KeteranganTidakMampuSekolah = ({ tidakMampuSekolah, user, currentUser, id, approved, reason }: TidakMampuSekolahProps) => {

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

  const router = useRouter()
  const redirectToLetter = () => router.push(`/tidak-mampu-sekolah/${id}`)

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
      <TableCell>{tidakMampuSekolah.nama}</TableCell>
      <TableCell>{tidakMampuSekolah.tempatLahir}</TableCell>
      <TableCell>{formatDate(tidakMampuSekolah.tanggalLahir)}</TableCell>
      <TableCell>{tidakMampuSekolah.jenisKelamin}</TableCell>
      <TableCell>{tidakMampuSekolah.agama}</TableCell>
      <TableCell>{tidakMampuSekolah.alamat}</TableCell>
      <TableCell>{tidakMampuSekolah.alasanTidakMampu}</TableCell>
      <TableCell>{tidakMampuSekolah.namaAyah}</TableCell>
      <TableCell>{tidakMampuSekolah.nikAyah}</TableCell>
      <TableCell>{tidakMampuSekolah.tempatLahirAyah}</TableCell>
      <TableCell>{formatDate(tidakMampuSekolah.tanggalLahirAyah)}</TableCell>
      <TableCell>{tidakMampuSekolah.agamaAyah}</TableCell>
      <TableCell>{tidakMampuSekolah.pekerjaanAyah}</TableCell>
      <TableCell>
        <Image
          src={tidakMampuSekolah.fotoKtpAyah}
          alt={tidakMampuSekolah.namaAyah}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        <Image
          src={tidakMampuSekolah.fotoRumah}
          alt="Foto Rumah"
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>{formatDate(tidakMampuSekolah.createdAt)}</TableCell>
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

export default KeteranganTidakMampuSekolah;
