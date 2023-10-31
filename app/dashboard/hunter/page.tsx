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

  return <div>Welcome Hunters!</div>;
}
