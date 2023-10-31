import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import axios from "axios";

interface PricingCardProps {
  price: any;
}

function PricingCard({ price }: PricingCardProps) {
  const handleSubscription = async (e: any) => {
    e.preventDefault();

    const { data } = await axios.post(
      "/api/checkout/payment",
      {
        priceId: price.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.assign(data);
  };

  return (
    <Card className="w-fit h-fit px-3 py-10 shadow-2xl">
      <CardHeader className="p-5">
        <CardTitle>Pricing</CardTitle>
        <CardDescription>Add credit to your account</CardDescription>
      </CardHeader>
      <CardContent className="p-5">
        <div>
          <h1 className="text-5xl font-bold">
            {(price.unit_amount / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h1>
        </div>
        <button
          className="mt-8 flex w-full justify-center rounded-md border border-transparent bg-[#f1592a] py-2 px-4 text-sm font-medium text-white shadow-sm"
          onClick={handleSubscription}
        >
          Add this package
        </button>
      </CardContent>
    </Card>
  );
}

export default PricingCard;
