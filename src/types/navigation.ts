export type RootStackParamList = {
  Home: undefined;
  Category: {
    categorySlug: string;
    categoryName: string;
  };
  Product: {
    productId: string;
    productName: string;
  };
  Categories: undefined;
  Login: undefined;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  features: string[];
}; 