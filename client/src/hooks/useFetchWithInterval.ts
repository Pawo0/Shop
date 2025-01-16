import {useEffect} from "react";

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
    await sleep(500) // to see loading functionality
      fetch(url)
        .then(res => {
          if (res.status === 404) {
            if (onNotFound) {
              onNotFound()
            }
            setLoading(false)
          }
          return res.json()
        })
        .then(data => {
          console.log('Fetched data:', data)
          if (onFetchData) {
            onFetchData(data)
          }
          setLoading(false)
        })
        .catch(err => {
          console.error('Error with loading data:', err)
        })
    }
    fetchData()

    const intervalId = setInterval(() => {
      if (loading) {
        fetchData()
      } else {
        clearInterval(intervalId)
      }
    }, interval)

    return () => clearInterval(intervalId)
  }, [...dependencies, loading]);
}