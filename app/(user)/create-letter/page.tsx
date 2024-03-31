import React from "react";
import FormCreateLetter from "./_components/FormCreateLetter";
import { getCurrentUser } from "@/services/user";
import { notFound } from "next/navigation";

const CreateLetterPage = async () => {

  const currentUser = await getCurrentUser();

  if (currentUser?.role !== "APPLICANT") return notFound()


  return <FormCreateLetter />;
};

export default CreateLetterPage;
