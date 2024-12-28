import {useEffect, useState} from "react";

export default function useCategories() {
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/api/products/categories')
      .then(res => res.json())
      .then(data => {
        const cat = data.categories.filter((el: string) => (!el.match('^men') && !el.match('^women')))
        setCategories(cat)
      })
  }, []);

  return ['all', 'women', 'men',...categories]

}