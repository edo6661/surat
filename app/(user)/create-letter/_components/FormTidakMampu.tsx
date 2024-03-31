"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/custom-ui/FormInput";
import { defaultValueTidakMampu, keyTidakMampu } from "@/constants/forms";
import { createTidakMampu } from "@/actions/tidakMampu";
import { motion } from "framer-motion";
import UploadImage from "@/components/custom-ui/UploadImage";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { X } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormDate from "@/components/custom-ui/FormDate";

export const tidakMampuSchema = z.object({
  nama: z.string().min(2, {
    message: "Nama must be at least 2 characters.",
  }),
  nik: z.string().min(2, {
    message: "NIK must be at least 2 characters.",
  }),
  jenisKelamin: z.string().min(2, {
    message: "Jenis Kelamin must be at least 2 characters.",
  }),
  tempatLahir: z.string().min(2, {
    message: "Tempat Lahir must be at least 2 characters.",
  }),
  tanggalLahir: z.date(),
  agama: z.string().min(2, {
    message: "Agama must be at least 2 characters.",
  }),
  alasanTidakMampu: z.string().min(2, {
    message: "Alasan Tidak Mampu must be at least 2 characters.",
  }),
  pendapatan: z.string(),
  alamat: z.string().min(2, {
    message: "Alamat must be at least 2 characters.",
  }),
  pekerjaan: z.string().min(2, {
    message: "Pekerjaan must be at least 2 characters.",
  }),
  fotoKtp: z.string().min(2, {
    message: "Foto KTP must be at least 2 characters.",
  }),
  fotoRumah: z.string().min(2, {
    message: "Foto Rumah must be at least 2 characters.",
  }),
  keperluan: z.string().min(2, {
    message: "Keperluan must be at least 2 characters.",
  }),
});

export default function FormTidakMampu() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof tidakMampuSchema>>({
    resolver: zodResolver(tidakMampuSchema),
    defaultValues: {
      ...defaultValueTidakMampu,
    },
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof tidakMampuSchema>) {
    startTransition(() => {
      createTidakMampu(values)
        .then((data) => {
          form.reset();
          toast.success("Success create letter");
          router.push("/letters");
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
        {keyTidakMampu.map((key) => {
          return key.name === "fotoKtp" || key.name === "fotoRumah" ? (
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
                <motion.div layout className="relative w-fit mx-auto"
                  key={key.name}
                >
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
          ) : key.name === "tanggalLahir" ? (
            <FormDate
              key={key.name}
              name={key.name}
              label={key.label}
              control={form.control}
            />
          ) : key.name === "pendapatan" ? (
            <>
              <FormInput
                key={key.name}
                name={key.name}
                label={key.label}
                control={form.control}
                placeholder={key.label}
                type="number"
              />
            </>
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
          {isPending ? "Loading..." : "Submit"}
        </Button>
      </motion.form>
    </Form>
  );
}
