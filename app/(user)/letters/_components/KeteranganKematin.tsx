import { deleteLetterWithId, updateReasonLetterWithId } from '@/actions/letter';
import AlertDialog from '@/components/custom-ui/AlertDialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { Kematian, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';
import ToggleApproveItem from './ToggleApproveItem';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import DialogReason from './DialogReason';
import { Input } from '@/components/ui/input';

interface KematianProps extends Letter {
  kematian: Kematian;
  user: User;
  currentUser: User;
}

const KeteranganKematian = ({ kematian, user, id, currentUser, approved, reason }: KematianProps) => {

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
      onClick={() => router.push(`/kematian/${id}`)}
      className='cursor-pointer'
    >
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

export default KeteranganKematian;
