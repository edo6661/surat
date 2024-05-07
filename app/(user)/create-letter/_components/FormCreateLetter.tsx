"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormulirType } from "@/constants/letter";
import SelectCategory from "./SelectCategory";
import { AnimatePresence, motion } from "framer-motion";
import FormDomisiliUsaha from "./FormDomisiliUsaha";
import FormTinggalPenduduk from "./FormTinggalPenduduk";
import { useState } from "react";
import FormKelahiran from "./FormKelahiran";
import FormKematian from "./FormKematian";
import FormTidakMampuSekolah from "./FormTidakMampuSekolah";
import FormPengantarSKCK from "./FormPengantarSKCK";
import FormKeteranganUsaha from "./FormKeteranganUsaha";
import FormTidakMampu from "./FormTidakMampu";
import FormSuamiIstri from "./FormSuamiIstri";
import FormBelumMenikah from "./FormBelumMenikah";

const FormCreateLetter = () => {
  const [selectedItem, setSelectedItem] = useState<FormulirType | null>(null);

  const handleSelect = (value: FormulirType | null) => setSelectedItem(value);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <section>
      <div className="base-container space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Letter</CardTitle>
            <CardDescription>Creating Letter</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SelectCategory handleSelect={handleSelect}
            />
            <AnimatePresence>
              {selectedItem === "Domisili Usaha" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={variants}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <FormDomisiliUsaha />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {selectedItem === "Tinggal Penduduk" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={variants}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <FormTinggalPenduduk />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {selectedItem === "Kelahiran" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={variants}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <FormKelahiran />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {selectedItem === "Kematian" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={variants}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <FormKematian />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {selectedItem === "Tidak Mampu (Sekolah)" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={variants}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <FormTidakMampuSekolah />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {selectedItem === "Pengantar SKCK" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={variants}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <FormPengantarSKCK />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {selectedItem === "Usaha" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={variants}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <FormKeteranganUsaha />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {selectedItem === "Tidak Mampu (Umum)" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={variants}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <FormTidakMampu />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {selectedItem === "Suami Istri" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={variants}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <FormSuamiIstri />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {selectedItem === "Belum Menikah" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={variants}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <FormBelumMenikah />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FormCreateLetter;
