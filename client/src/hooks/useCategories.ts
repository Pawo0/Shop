import { useEffect, useState } from "react";
import axios from "axios";

export default function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/categories');
        const data = res.data;
        const cat = data.categories.filter((el: string) => (!el.match('^men') && !el.match('^women')));
        setCategories(cat);
        setLoading(false);
      } catch (err) {
        console.error('Błąd pobierania kategorii:', err);
      }
    }
    fetchData();

    const intervalId = setInterval(() => {
      if (loading) {
        fetchData()
      } else {
        clearInterval(intervalId)
      }
    }, 5000)

    return () => clearInterval(intervalId)
  }, [loading]);

  return ['all', 'women', 'men', ...categories];
}