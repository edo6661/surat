import { deleteLetterWithId } from '@/actions/letter';
import AlertDialog from '@/components/custom-ui/AlertDialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { KeteranganBelumMenikah, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React, { useTransition } from 'react';
import { toast } from 'sonner';
import ToggleApproveItem from './ToggleApproveItem';
import { Button } from '@/components/ui/button';

import DialogReason from './DialogReason';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateReasonLetterWithId } from '@/actions/letter';

interface KeteranganBelumMenikahProps extends Letter {
  keteranganBelumMenikah: KeteranganBelumMenikah;
  user: User;
  currentUser: User;
}

const BelumMenikah = ({ keteranganBelumMenikah, user,
  currentUser, id, approved, reason
}: KeteranganBelumMenikahProps) => {

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
  const redirectToLetter = () => router.push(`/belum-menikah/${id}`)

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
      <TableCell>{keteranganBelumMenikah.nama}</TableCell>
      <TableCell>{keteranganBelumMenikah.tempatLahir}</TableCell>
      <TableCell>{formatDate(keteranganBelumMenikah.tanggalLahir)}</TableCell>
      <TableCell>{keteranganBelumMenikah.agama}</TableCell>
      <TableCell>{keteranganBelumMenikah.alamat}</TableCell>
      <TableCell>{keteranganBelumMenikah.pekerjaan}</TableCell>
      <TableCell>{keteranganBelumMenikah.nik}</TableCell>
      <TableCell>
        <Image
          src={keteranganBelumMenikah.fotoKtp}
          alt={keteranganBelumMenikah.nama}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        <Image
          src={keteranganBelumMenikah.fotoKk}
          alt="Foto KK"
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        <Image
          src={keteranganBelumMenikah.fotoAktaKelahiran}
          alt="Foto Akta Kelahiran"
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>{formatDate(keteranganBelumMenikah.createdAt)}</TableCell>
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

export default BelumMenikah;
