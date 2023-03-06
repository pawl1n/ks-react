import useSWR from 'swr';
import { Category, Product, SWRResponse } from '../interfaces';
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useProducts = (): SWRResponse<Product> => {
  const { data, error } = useSWR(
    'http://localhost:8080/api/v1/products',
    fetcher,
  );

  return {
    data: data?._embedded ? data._embedded['products'] : [],
    isLoading: !error && !data,
    isError: error,
  };
};

export const useCategories = (): SWRResponse<Category> => {
  const { data, error } = useSWR(
    'http://localhost:8080/api/v1/categories',
    fetcher,
  );

  return {
    data: data?._embedded ? data._embedded['categories'] : [],
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSampleClients = () => {
  const { data, error } = useSWR('/data-sources/clients.json', fetcher);

  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSampleTransactions = () => {
  const { data, error } = useSWR('/data-sources/history.json', fetcher);

  return {
    transactions: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  };
};
