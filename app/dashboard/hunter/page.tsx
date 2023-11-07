"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export default function page() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  if (status === "loading") {
    return "Loading or not authenticated...";
  }

  if (session && session.user) {
    var accountType = (session as any).account.accountType.toLowerCase();

    if (accountType == "undecided") {
      redirect(`/dashboard/`);
    }
  }

  return <div className="flex flex-col items-center justify-center mt-40">
    <h1 className="font-logo-font font-extrabold dark:text-gray-50 text-black mt-2 ml-2 sm:text-xl md:text-5xl lg:text-[10rem] sm:mt-4 sm:ml-4 left-[20vw] max-w-9xl mb-10">Welcome Hunters!</h1>
    <h2 className="relative dark:text-gray-50 text-black mt-2 ml-2 sm:text-xl sm:mt-4 sm:ml-4 font-logo-font max-w-4xl lg:text-[28px] lg:leading-8">Where your hunting starts</h2>
  </div>;
}
