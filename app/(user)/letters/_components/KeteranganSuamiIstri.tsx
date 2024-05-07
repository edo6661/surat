import { deleteLetterWithId, updateReasonLetterWithId } from '@/actions/letter';
import AlertDialog from '@/components/custom-ui/AlertDialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { KeteranganSuamiIstri, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React, { useTransition } from 'react';
import { toast } from 'sonner';
import ToggleApproveItem from './ToggleApproveItem';
import { useRouter } from 'next/navigation';
import DialogReason from './DialogReason';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';


interface KeteranganSuamiIstriProps extends Letter {
  keteranganSuamiIstri: KeteranganSuamiIstri;
  user: User;
  currentUser: User;
}

const SuamiIstri = ({ keteranganSuamiIstri, user, currentUser, id, approved, reason }: KeteranganSuamiIstriProps) => {

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
  const redirectToLetter = () => router.push(`/suami-istri/${id}`)

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
      <TableCell>{keteranganSuamiIstri.namaSuami}</TableCell>
      <TableCell>{keteranganSuamiIstri.nikSuami}</TableCell>
      <TableCell>{keteranganSuamiIstri.tempatLahirSuami}</TableCell>
      <TableCell>{formatDate(keteranganSuamiIstri.tanggalLahirSuami)}</TableCell>
      <TableCell>{keteranganSuamiIstri.agamaSuami}</TableCell>
      <TableCell>{keteranganSuamiIstri.alamatSuami}</TableCell>
      <TableCell>{keteranganSuamiIstri.pekerjaanSuami}</TableCell>
      <TableCell>{keteranganSuamiIstri.namaIstri}</TableCell>
      <TableCell>{keteranganSuamiIstri.nikIstri}</TableCell>
      <TableCell>{keteranganSuamiIstri.tempatPernikahan}</TableCell>
      <TableCell>{formatDate(keteranganSuamiIstri.tanggalPernikahan)}</TableCell>
      <TableCell>{keteranganSuamiIstri.agamaIstri}</TableCell>
      <TableCell>{keteranganSuamiIstri.alamatIstri}</TableCell>
      <TableCell>{keteranganSuamiIstri.pekerjaanIstri}</TableCell>
      <TableCell>
        <Image
          src={keteranganSuamiIstri.fotoKtpSuami}
          alt={keteranganSuamiIstri.namaSuami}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        <Image
          src={keteranganSuamiIstri.fotoKtpIstri}
          alt={keteranganSuamiIstri.namaIstri}
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>
        <Image
          src={keteranganSuamiIstri.fotoBukuNikah}
          alt="Foto Buku Nikah"
          width={72}
          height={72}
          className=' aspect-square rounded-full'
        />
      </TableCell>
      <TableCell>{formatDate(keteranganSuamiIstri.createdAt)}</TableCell>
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

export default SuamiIstri;
