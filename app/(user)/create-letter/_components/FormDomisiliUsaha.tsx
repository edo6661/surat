"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/custom-ui/FormInput";
import { defaultValueDomisiliUsaha, keyDomisiliUsaha } from "@/constants/forms";
import { motion } from "framer-motion";
import UploadImage from "@/components/custom-ui/UploadImage";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { X } from "lucide-react";
import { useTransition } from "react";
import { createDomisiliUsaha } from "@/actions/domisiliUsaha";
import { toast } from "sonner";

export const domisiliUsaha = z.object({
  pemilikUsaha: z.string().min(2, {
    message: "Pemilik Usaha must be at least 2 characters.",
  }),
  alamatUsaha: z.string().min(2, {
    message: "Alamat Usaha must be at least 2 characters.",
  }),
  jenisUsaha: z.string().min(2, {
    message: "Jenis Usaha must be at least 2 characters.",
  }),
  namaUsaha: z.string().min(2, {
    message: "Nama Usaha must be at least 2 characters.",
  }),
  nik: z.string().min(2, {
    message: "NIK must be at least 2 characters.",
  }),
  fotoKtp: z.string().min(2, {
    message: "Foto KTP must be at least 2 characters.",
  }),
  fotoUsaha: z.string().min(2, {
    message: "Foto Usaha must be at least 2 characters.",
  }),
});

export default function FormDomisiliUsaha() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof domisiliUsaha>>({
    resolver: zodResolver(domisiliUsaha),
    defaultValues: {
      ...defaultValueDomisiliUsaha,
    },
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof domisiliUsaha>) {
    startTransition(() => {
      createDomisiliUsaha(values)
        .then((data) => {
          toast.success("Success create letter");
          form.reset();
        })
        .catch((err) => {
          toast.error("Failed create letter");
        });
    });
  }
  const { setValue, watch } = form;

  const formValues = watch();

  return (
    <Form {...form}>
      <motion.form
        layout
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {keyDomisiliUsaha.map((key) => {
          return key.name === "fotoKtp" || key.name === "fotoUsaha" ? (
            <motion.div key={key.label} layout>
              {!formValues[key.name] && (
                <>
                  <motion.div layout className="text-center space-y-2">
                    <Label>{key.label}</Label>
                    <UploadImage
                      setImage={setValue}
                      name={key.name}
                      key={key.name}
                    />
                  </motion.div>
                </>
              )}
              {formValues[key.name] && (
                <motion.div layout className="relative w-fit mx-auto">
                  <Image
                    src={formValues[key.name]}
                    alt={key.label}
                    width={300}
                    height={300}
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => setValue(key.name as any, "")}
                    className="absolute top-0 right-0"
                  >
                    <X size={20} />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <FormInput
              key={key.name}
              name={key.name}
              label={key.label}
              control={form.control}
              placeholder={key.label}
            />
          );
        })}
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </motion.form>
    </Form>
  );
}
