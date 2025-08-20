import useSWR from "swr";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export interface UserTransaction {
  id: string;
  userId: string;
  amount: number;
  status: string;
  reference: string;
  narration: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserTransactionsResponse {
  transactions?: UserTransaction[];
  total?: number;
  totalAmount?: number;
}

async function fetchUserTransactions(url: string, token: string) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
}

// The user endpoint returns ALL transactions for the user at /transactions/my (no pagination)
export function useUserTransactions(token?: string) {
  const shouldFetch = !!token && !!BASE_URL;
  const url = `${BASE_URL}/transactions/my`;

  const { data, error, isLoading } = useSWR<UserTransactionsResponse | UserTransaction[], Error>(
    shouldFetch ? [url, token] : null,
    ([u, t]: [string, string]) => fetchUserTransactions(u, t)
  );

  let transactions: UserTransaction[] = [];
  let total = 0;
  let totalAmount = 0;

  if (Array.isArray(data)) {
    transactions = data as UserTransaction[];
    total = transactions.length;
    totalAmount = transactions.reduce((s, tx) => s + (tx.amount || 0), 0);
  } else if (data) {
    transactions = data.transactions || [];
    total = data.total ?? transactions.length;
    totalAmount = data.totalAmount ?? transactions.reduce((s, tx) => s + (tx.amount || 0), 0);
  }

  return {
    transactions,
    total,
    totalAmount,
    isLoading,
    error,
  };
}
