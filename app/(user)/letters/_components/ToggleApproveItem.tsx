import { toggleApproveLetterWithId } from '@/actions/letter'
import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import React, { useTransition } from 'react'
import { toast } from 'sonner'
interface ToggleApproveItemProps {
  approved: boolean
  id: string
}
const ToggleApproveItem = (
  { approved, id }: ToggleApproveItemProps
) => {
  const [isPending, startTransition] = useTransition();
  const handleApprove = async () => {
    startTransition(() => {
      toggleApproveLetterWithId(id, approved)
        .then((data) => {
          toast.success(`Changes has been saved`);
        })
        .catch((err) => {
          console.error(err);
          toast.error(`Failed to approve data: ${err.message}`);
        });
    });
  };
  return (
    <TableCell>
      <Button
        variant={approved ? "default" : "destructive"}
        size="sm"
        onClick={handleApprove}
        disabled={isPending}
      >
        {!isPending ? approved ? "Approved" : "Dissaprove" : "Loading..."}
      </Button>
    </TableCell>
  )
}

export default ToggleApproveItem