import { Poppins } from "next/font/google";
import ImageLogo from "./ImageLogo";
import { cn } from "@/lib/utils";

export const Logo = () => {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 ")}>
      <ImageLogo />
      <div className="flex flex-col items-center justify-center ">
        <h1 className="title">
          Kecamatan Jatiuwung <span className="text-muted-foreground">&#8506;</span>
        </h1>
      </div>
    </div>
  );
};
