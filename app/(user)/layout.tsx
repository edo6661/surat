import Header from "@/components/custom-ui/Header";
import React from "react";

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default UserLayout;
