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
  returnPolicy: string;
  shippingInformation: string;
  availabilityStatus: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
}

export interface CartInterface {
  productId: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export interface ReviewInterface {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
}


export interface DecodedToken {
  username: string;
  role: string;
  userId: string;
}

export interface UserInterface {
  username: string;
  role: string;
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface EditProfileInterface {
  email?: string;
  firstName?: string;
  lastName?: string;
}
