"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/custom-ui/FormInput";
import { defaultValueKelahiran, keyKelahiran } from "@/constants/forms";
import { createKelahiran } from "@/actions/kelahiran";
import { motion } from "framer-motion";
import UploadImage from "@/components/custom-ui/UploadImage";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { X } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormDate from "@/components/custom-ui/FormDate";

export const kelahiran = z.object({
  jenisKelamin: z.string().min(2, {
    message: "Jenis Kelamin must be at least 2 characters.",
  }),
  tanggalLahir: z.date(),
  tempatLahir: z.string().min(2, {
    message: "Tempat Lahir must be at least 2 characters.",
  }),
  agama: z.string().min(2, {
    message: "Agama must be at least 2 characters.",
  }),
  namaAyah: z.string().min(2, {
    message: "Nama Ayah must be at least 2 characters.",
  }),
  tempatLahirAyah: z.string().min(2, {
    message: "Tempat Lahir Ayah must be at least 2 characters.",
  }),
  tanggalLahirAyah: z.date(),
  agamaAyah: z.string().min(2, {
    message: "Agama Ayah must be at least 2 characters.",
  }),
  pekerjaanAyah: z.string().min(2, {
    message: "Pekerjaan Ayah must be at least 2 characters.",
  }),
  namaIbu: z.string().min(2, {
    message: "Nama Ibu must be at least 2 characters.",
  }),
  tempatLahirIbu: z.string().min(2, {
    message: "Tempat Lahir Ibu must be at least 2 characters.",
  }),
  tanggalLahirIbu: z.date(),
  agamaIbu: z.string().min(2, {
    message: "Agama Ibu must be at least 2 characters.",
  }),
  pekerjaanIbu: z.string().min(2, {
    message: "Pekerjaan Ibu must be at least 2 characters.",
  }),
  fotoKtpAyah: z.string().min(2, {
    message: "Foto KTP Ayah must be at least 2 characters.",
  }),
  fotoKtpIbu: z.string().min(2, {
    message: "Foto KTP Ibu must be at least 2 characters.",
  }),
  fotoKk: z.string().min(2, {
    message: "Foto KK must be at least 2 characters.",
  }),
});

export default function FormKelahiran() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof kelahiran>>({
    resolver: zodResolver(kelahiran),
    defaultValues: {
      ...defaultValueKelahiran,
    },
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof kelahiran>) {
    startTransition(() => {
      createKelahiran(values)
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
        {keyKelahiran.map((key) => {
          return key.name === "fotoKtpAyah" || key.name === "fotoKtpIbu" || key.name === "fotoKk" ? (
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
          ) : key.name === "tanggalLahir" || key.name === "tanggalLahirAyah" || key.name === "tanggalLahirIbu" ? (
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
