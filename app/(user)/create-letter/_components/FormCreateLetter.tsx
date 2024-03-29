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
            <SelectCategory handleSelect={handleSelect} />
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
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FormCreateLetter;
