import React from "react";
import { redirect } from "next/navigation";
import { auth } from '@/auth.config';

export default async function  CheckoutLayout({
 children
}: Readonly<{
    children: React.ReactNode;
  }>) {
    const session = await auth();

    if (!session?.user) {
       // redirect("/auth/login?redirectTo=/checkout/address");
    }

  return (
    <>
      {children}
    </>
  );
}