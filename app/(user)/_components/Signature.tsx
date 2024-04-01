"use client";
import { SignatureComponent, Signature } from "@syncfusion/ej2-react-inputs";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/lib/utils";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { addSignatureToLetter } from "@/actions/letter";
import DialogSignature from "./DialogSignature";
import Image from "next/image";
import { X } from "lucide-react";
interface SignatureProps {
  id: string;

}
export default function Signatures(
  { id }: SignatureProps
) {
  const [image, setImage] = useState("");
  const [isPending, startTransition] = useTransition()
  let signObj: Signature | null;
  const OnSave = () => {
    signObj?.save()
  };
  const OnClear = () => {
    signObj?.clear();
  };
  const uploadSignature = () => {
    if (!image) return toast.error('Please upload signature image');
    startTransition(() => {
      addSignatureToLetter(id, image)
        .then(() => {
          toast.success('Signature added successfully');
        }).catch((err) => {
          toast.error('Failed to add signature');
          throw err
        })
    })
  };


  return <DialogSignature
    action={uploadSignature}
    isPending={isPending}
    trigger="Add Signature"
  >
    <div className="flex flex-col ">
      <div className="flex flex-col gap-2">
        {
          !image ? (
            <>
              <div className="fl-ic justify-between ">
                <Button onClick={OnSave} className="w-full rounded-none">Download</Button>
                <Button onClick={OnClear} className="w-full rounded-none">Clear</Button>
              </div>
              <SignatureComponent
                ref={(sign) => (signObj = sign)}
                velocity={1}
                // disabled={true}
                minStrokeWidth={2}
                maxStrokeWidth={5}
              >
                {/* backgroundImage="https://www.syncfusion.com/blogs/wp-content/uploads/2019/11/blog_1x.jpg" */}
              </SignatureComponent>
              <div className="flex flex-col gap-2 ">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => setImage(res[0].url)}
                  onUploadError={(error: Error) => {
                    toast.error(`ERROR! ${error.message}`);
                  }}
                />

              </div>
            </>
          ) : <>
            <div
              className="relative"
            >
              <Image
                src={image}
                width={320}
                height={320}
                alt="signature"
                className="mx-auto"
              />
              <Button onClick={() => setImage("")} className="rounded-full absolute right-0 top-0"
                variant="destructive"
                size="icon"
              >
                <X
                  size={24}
                />
              </Button>
            </div>
          </>
        }

      </div>

    </div>
  </DialogSignature>
}
