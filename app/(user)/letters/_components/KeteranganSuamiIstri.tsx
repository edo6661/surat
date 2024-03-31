import { deleteLetterWithId } from '@/actions/letter';
import AlertDialog from '@/components/custom-ui/AlertDialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formateDate';
import { KeteranganSuamiIstri, Letter, User } from '@prisma/client';
import Image from 'next/image';
import React, { useTransition } from 'react';
import { toast } from 'sonner';
import ToggleApproveItem from './ToggleApproveItem';

interface KeteranganSuamiIstriProps extends Letter {
  keteranganSuamiIstri: KeteranganSuamiIstri;
  user: User;
  currentUser: User;
}

const SuamiIstri = ({ keteranganSuamiIstri, user, currentUser, id, approved }: KeteranganSuamiIstriProps) => {

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

export default SuamiIstri;
