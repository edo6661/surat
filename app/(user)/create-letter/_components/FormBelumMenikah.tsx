"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/custom-ui/FormInput";
import { defaultValueKeteranganBelumMenikah, keyKeteranganBelumMenikah } from "@/constants/forms";
import { createBelumMenikah } from "@/actions/belumMenikah";
import { motion } from "framer-motion";
import UploadImage from "@/components/custom-ui/UploadImage";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { X } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormDate from "@/components/custom-ui/FormDate";

export const belumMenikahSchema = z.object({
  nama: z.string().min(2, {
    message: "Nama must be at least 2 characters.",
  }),
  tempatLahir: z.string().min(2, {
    message: "Tempat Lahir must be at least 2 characters.",
  }),
  tanggalLahir: z.date(),
  agama: z.string().min(2, {
    message: "Agama must be at least 2 characters.",
  }),
  alamat: z.string().min(2, {
    message: "Alamat must be at least 2 characters.",
  }),
  pekerjaan: z.string().min(2, {
    message: "Pekerjaan must be at least 2 characters.",
  }),
  nik: z.string().min(2, {
    message: "NIK must be at least 2 characters.",
  }),
  fotoKtp: z.string().min(2, {
    message: "Foto KTP must be at least 2 characters.",
  }),
  fotoKk: z.string().min(2, {
    message: "Foto KK must be at least 2 characters.",
  }),
  fotoAktaKelahiran: z.string().min(2, {
    message: "Foto Akta Kelahiran must be at least 2 characters.",
  }),
});

export default function FormBelumMenikah() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof belumMenikahSchema>>({
    resolver: zodResolver(belumMenikahSchema),
    defaultValues: {
      ...defaultValueKeteranganBelumMenikah,
    },
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof belumMenikahSchema>) {
    startTransition(() => {
      createBelumMenikah(values)
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
        {keyKeteranganBelumMenikah.map((key) => {
          return key.name === "fotoKtp" || key.name === "fotoKk" || key.name === "fotoAktaKelahiran" ? (
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
