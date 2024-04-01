import {
  AlertDialog as Alert,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";

import React from 'react'
interface AlertDialogProps {
  action: () => void;
  isPending: boolean;
  trigger: string;
  children?: React.ReactNode;
}
const DialogSignature = (
  { action, isPending, trigger, children }: AlertDialogProps
) => {
  return (
    <Alert>
      <AlertDialogTrigger asChild>
        <Button className=" my-4">{trigger}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Signature</AlertDialogTitle>

        </AlertDialogHeader>
        {children}
        <AlertDialogFooter className="fl-ic">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="mt-2"
            onClick={action}
            disabled={isPending}
          >
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </Alert>
  )
}

export default DialogSignature