import React, { useEffect, useState } from "react";
import { useBalance } from "./Balance";

export default function BalanceView() {
  const { balance, isLoading, isError } = useBalance();
  const [balanceCredit, setBalanceCredit] = useState(0);

  // Update balanceCredit whenever balance.creditBalance changes
  useEffect(() => {
    if (balance) {
      console.log(balance);
      setBalanceCredit(balance.creditBalance);
    }
  }, [balance]);

  if (isError) {
    return <p>Failed to fetch</p>;
  }

  if (isLoading) {
    return <p>Loading</p>;
  }

  return <div>Credits: {balanceCredit}</div>;
}
