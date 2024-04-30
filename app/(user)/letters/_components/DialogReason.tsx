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

import React, { useState } from 'react'
interface AlertDialogProps {
  action: () => Promise<void>
  isPending: boolean;
  trigger: string;
  children?: React.ReactNode;
}
const DialogReason = (
  { action, isPending, trigger, children }: AlertDialogProps
) => {
  return (
    <Alert>
      <AlertDialogTrigger asChild>
        <Button className=" my-4" size="sm">{trigger}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reason</AlertDialogTitle>

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

export default DialogReason