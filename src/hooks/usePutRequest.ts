import { useState, useCallback } from "react";
import Axios from "./Axios";
import { AxiosError, type AxiosRequestConfig } from "axios";

interface UsePutRequestState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UsePutRequestReturn<T> extends UsePutRequestState<T> {
  execute: (url: string, payload?: any, config?: AxiosRequestConfig) => Promise<T | null>;
  reset: () => void;
}

export const usePutRequest = <T = any>(): UsePutRequestReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (
    url: string, 
    payload?: any, 
    config?: AxiosRequestConfig
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await Axios.put<T>(url, payload, config);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof AxiosError 
        ? err.response?.data?.message || err.message 
        : "An unexpected error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};

