import { useEffect, useState } from "react";

export default function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:5000/api/products/categories')
        .then(res => res.json())
        .then(data => {
          let cat = data.categories.filter((el: string) => (!el.match('^men') && !el.match('^women')));
          console.log("Fetched categories:", cat);
          setCategories(cat);
          setLoading(false);
        })
        .catch(err => {
          console.error('Błąd pobierania kategorii:', err);
        });
    }
    fetchData()

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