"use client";
import { useSession } from "next-auth/react";
import PricingCard from "@/app/components/Products/PricingCard";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Checkout() {
  const [prices, setPrices] = React.useState<object[]>([]);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  useEffect(() => {
    if (status === "authenticated") {
      fetchPrices();
    }
  }, [status]);

  if (status === "loading") {
    return "Loading or not authenticated...";
  }

  const fetchPrices = async () => {
    await fetch("/api/checkout/product")
      .then((response) => response.json())
      .then((data) => {
        setPrices(data);
        console.log(data);
      });
  };

  return (
    <section className="w-full">
      <div className="mx-auto max-w-4xl text-center mt-10 items-center">
        <h2 className="text-3xl font-semibold leading-7 text-[#f1592a]">
          Pricing
        </h2>
        <p className="mt-2 text-4xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-5xl">
          Choose the right package for you!
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 dark:text-gray-300 text-gray-600 sm:text-center">
          Check out all the information below
        </p>
      </div>
      <div className="flex p-10 justify-center">
        <div className="inline-grid grid-cols-2 justify-center gap-20 max-w-[1040px]">
          {prices &&
            prices.map((price) => (
              <PricingCard price={price} key={(price as any).id} />
            ))}
        </div>
      </div>
    </section>
  );
}
