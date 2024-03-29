import React from "react";

import { UploadButton } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
  setImage: any;
  name: string;
}

const UploadImage = ({ setImage, name }: Props) => {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => setImage(name, res[0].url)}
      onUploadError={(error: Error) => {
        toast.error(`ERROR! ${error.message}`);
      }}
    />
  );
};

export default UploadImage;
