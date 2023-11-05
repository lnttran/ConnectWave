import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export function useBalance() {
  const { data, error, isLoading } = useSWR("/api/account/", fetcher);

  return {
    balance: data,
    isLoading,
    isError: error,
  };
}
