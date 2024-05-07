import {
  getAllLetters,
  getCurrentUserLetters,
} from "@/services/letter";
import React from "react";
import Letters from "./_components/Letters";
import { getCurrentUser } from "@/services/user";

const LetterPage = async () => {
  const currentUser = await getCurrentUser();
  const allLetters = await getAllLetters();
  const userLetters = await getCurrentUserLetters();

  return (
    <Letters
      allLetters={allLetters!}
      userLetters={userLetters!}
      currentUser={currentUser!}
    />
  );
};

export default LetterPage;
