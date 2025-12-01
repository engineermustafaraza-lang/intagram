import { QueryClient } from "@tanstack/react-query";

async function customFetch(
  url: string,
  options?: RequestInit
): Promise<Response> {
  const response = await fetch(url, {
    ...options,
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    if (response.status >= 500) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    throw new Error(data.message || `${response.status}: ${response.statusText}`);
  }

  return response;
}

export async function apiRequest(
  url: string,
  options?: RequestInit
): Promise<Response> {
  return customFetch(url, options);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const response = await customFetch(queryKey[0] as string);
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      },
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
