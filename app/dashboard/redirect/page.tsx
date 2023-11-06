"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Dashboard() {
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
    } else {
      redirect(`/dashboard/${accountType}`);
    }
  }
}
