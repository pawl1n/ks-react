import useSWR from 'swr';

export type ProductRequest = {
  name: string;
  description: string;
  category?: number;
};

const fetcher = (product: ProductRequest) =>
  fetch('http://localhost:8080/api/v1/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  }).then((data) => data.json());

export const usePostProduct = (product: ProductRequest) => {
  const { data, error } = useSWR(product, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    message: error?.message,
  };
};
