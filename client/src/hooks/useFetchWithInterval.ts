import {useEffect} from "react";
import axios from "axios";

interface FetchParams {
  url: string;
  dependencies?: any[];
  onNotFound?: () => void;
  onFetchData?: (data: any) => void;
  interval: number;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function useFetchWithInterval({
                                               url,
                                               dependencies = [],
                                               onFetchData,
                                               interval,
                                               onNotFound,
                                               loading,
                                               setLoading
                                             }: FetchParams) {

  useEffect(() => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const fetchData = async () => {
      await sleep(500); // to see loading functionality in action
      try {
        const res = await axios.get(url);
        if (res.status === 404) {
          if (onNotFound) {
            onNotFound();
          }
          setLoading(false);
        } else {
          if (onFetchData) {
            onFetchData(res.data);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error('Error with loading data:', err);
        setLoading(false);
      }
    };
    fetchData();

    const intervalId = setInterval(() => {
      if (loading) {
        fetchData();
      } else {
        clearInterval(intervalId);
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [...dependencies, loading]);
}