import { deleteLetterWithId, updateReasonLetterWithId } from '@/actions/letter';
import AlertDialog from '@/components/custom-ui/AlertDialog';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { DomisiliUsaha, Letter, User } from '@prisma/client'
import Image from 'next/image';
import React, { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner';
import ToggleApproveItem from './ToggleApproveItem';
import { useRouter } from 'next/navigation';
import DialogReason from './DialogReason';
import { Input } from '@/components/ui/input';
import DialogPhoto from '@/components/custom-ui/DialogPhoto';
interface DomisiliUsahaProps extends Letter {
  domisiliUsaha: DomisiliUsaha;
  user: User;
  currentUser: User;
}
const KeteranganDomisiliUsaha = (
  { domisiliUsaha, user, currentUser, id, approved, signature, reason }: DomisiliUsahaProps
) => {
  const [isPending, startTransition] = useTransition();
  const [alasan, setAlasan] = useState(reason ?? "");
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

  const redirectToLetter = () => router.push(`/letter/${id}`)

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
      <TableCell>
        {domisiliUsaha.pemilikUsaha}
      </TableCell>
      <TableCell>
        {domisiliUsaha.alamatUsaha}
      </TableCell>
      <TableCell>
        {domisiliUsaha.jenisUsaha}
      </TableCell>
      <TableCell>
        {domisiliUsaha.namaUsaha}
      </TableCell>
      <TableCell>
        {domisiliUsaha.nik}
      </TableCell>
      <TableCell
        onClick={(e) => e.stopPropagation()}
      >
        <DialogPhoto
          trigger={
            <Image
              src={domisiliUsaha.fotoKtp}
              alt={domisiliUsaha.pemilikUsaha}
              width={72}
              height={72}
              className=' aspect-square rounded-full'
            />
          }
        >
          <Image
            src={domisiliUsaha.fotoKtp}
            alt={domisiliUsaha.pemilikUsaha}
            width={560}
            height={560}
          />
        </DialogPhoto>
      </TableCell>
      <TableCell
        onClick={(e) => e.stopPropagation()}
      >
        <DialogPhoto
          trigger={
            <Image
              src={domisiliUsaha.fotoUsaha}
              alt={domisiliUsaha.namaUsaha}
              width={72}
              height={72}
              className=' aspect-square rounded-full'
            />
          }
        >
          <Image
            src={domisiliUsaha.fotoUsaha}
            alt={domisiliUsaha.namaUsaha}
            width={560}
            height={560}
          />
        </DialogPhoto>

      </TableCell>
      <TableCell>
        {formatDate(domisiliUsaha.createdAt)}
      </TableCell>
      {
        currentUser.role === "APPLICANT" && (
          <>
            <TableCell>
              <Button variant={approved ? "default" : "destructive"} size="sm" className=' select-none'>
                {approved ? "Approved" : "Pending"}
              </Button>
            </TableCell>
            {
              reason && (
                <TableCell>
                  {reason}
                </TableCell>
              )
            }
          </>
        )
      }
      {currentUser.role !== "APPLICANT" && (
        <>
          <ToggleApproveItem
            id={id}
            approved={approved}
            signature={signature!}
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
          <TableCell
            onClick={(e) => e.stopPropagation()}
          >
            <AlertDialog
              action={handleDelete}
              isPending={isPending}
              trigger={
                isPending ? "Deleting..." : "Delete"
              }
            />
          </TableCell>
        </>
      )}
    </TableRow>
  )
}

export default KeteranganDomisiliUsaha