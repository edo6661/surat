"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/custom-ui/FormInput";
import { defaultValueKeteranganSuamiIstri, keyKeteranganSuamiIstri } from "@/constants/forms";
import { createSuamiIstri } from "@/actions/suamiIstri";
import { motion } from "framer-motion";
import UploadImage from "@/components/custom-ui/UploadImage";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { X } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormDate from "@/components/custom-ui/FormDate";

export const suamiIstriSchema = z.object({
  namaSuami: z.string().min(2, {
    message: "Nama Suami must be at least 2 characters.",
  }),
  nikSuami: z.string().min(2, {
    message: "NIK Suami must be at least 2 characters.",
  }),
  tempatLahirSuami: z.string().min(2, {
    message: "Tempat Lahir Suami must be at least 2 characters.",
  }),
  tanggalLahirSuami: z.date(),
  agamaSuami: z.string().min(2, {
    message: "Agama Suami must be at least 2 characters.",
  }),
  alamatSuami: z.string().min(2, {
    message: "Alamat Suami must be at least 2 characters.",
  }),
  pekerjaanSuami: z.string().min(2, {
    message: "Pekerjaan Suami must be at least 2 characters.",
  }),
  namaIstri: z.string().min(2, {
    message: "Nama Istri must be at least 2 characters.",
  }),
  nikIstri: z.string().min(2, {
    message: "NIK Istri must be at least 2 characters.",
  }),
  tempatPernikahan: z.string().min(2, {
    message: "Tempat Pernikahan must be at least 2 characters.",
  }),
  tanggalPernikahan: z.date(),
  agamaIstri: z.string().min(2, {
    message: "Agama Istri must be at least 2 characters.",
  }),
  alamatIstri: z.string().min(2, {
    message: "Alamat Istri must be at least 2 characters.",
  }),
  pekerjaanIstri: z.string().min(2, {
    message: "Pekerjaan Istri must be at least 2 characters.",
  }),
  fotoKtpSuami: z.string().min(2, {
    message: "Foto KTP Suami must be at least 2 characters.",
  }),
  fotoKtpIstri: z.string().min(2, {
    message: "Foto KTP Istri must be at least 2 characters.",
  }),
  fotoBukuNikah: z.string().min(2, {
    message: "Foto Buku Nikah must be at least 2 characters.",
  }),
});

export default function FormSuamiIstri() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof suamiIstriSchema>>({
    resolver: zodResolver(suamiIstriSchema),
    defaultValues: {
      ...defaultValueKeteranganSuamiIstri,
    },
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof suamiIstriSchema>) {
    startTransition(() => {
      createSuamiIstri(values)
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
        {keyKeteranganSuamiIstri.map((key) => {
          return key.name === "fotoKtpSuami" || key.name === "fotoKtpIstri" || key.name === "fotoBukuNikah" ? (
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
          ) : key.name === "tanggalLahirSuami" || key.name === "tanggalPernikahan" || key.name === "tanggalLahir" ? (
            <FormDate
              key={key.name}
              name={key.name}
              label={key.label}
              control={form.control}
            />
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
