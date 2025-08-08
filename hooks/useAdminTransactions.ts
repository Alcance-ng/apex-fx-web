import useSWR from "swr";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  status: string;
  reference: string;
  narration: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminTransactionsResponse {
  transactions: Transaction[];
  total: number;
  totalAmount: number;
}

async function fetchAdminTransactions(url: string, token: string) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
}

export function useAdminTransactions(token?: string) {
  const shouldFetch = !!token && !!BASE_URL;
  const { data, error, isLoading } = useSWR<AdminTransactionsResponse, Error>(
    shouldFetch ? [`${BASE_URL}/transactions/admin`, token] : null,
    ([url, token]: [string, string]) => fetchAdminTransactions(url, token)
  );
  return {
    transactions: data?.transactions || [],
    total: data?.total || 0,
    totalAmount: data?.totalAmount || 0,
    isLoading,
    error,
  };
}
