export interface ProductsInterface {
  _id: string;
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  brand: string;
  images: string[];
  thumbnail: string;
  stock: number;
  reviews: ReviewInterface[];
}

export interface ReviewInterface {
  productId: string;
  user: {
    userId: string;
    username: string;
    firstName?: string;
    lastName?: string;
  }
  rating: number;
  comment: string;
  date: string;
}


