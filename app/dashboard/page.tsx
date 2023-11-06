"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import SetupForm from "../components/Setup/SetupForm";
import { AnimatePresence, motion } from "framer-motion";

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
      return (
        <div className="flex justify-center min-h-screen h-full items-center bg-background">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ scale: [0, 1], opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              <SetupForm />
            </motion.div>
          </AnimatePresence>
        </div>
      );
    } else {
      redirect(`/dashboard/${accountType}`);
    }
  }
}
