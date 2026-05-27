export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: 'Men' | 'Women' | 'New Arrivals' | 'Denim Collection' | 'Accessories' | 'Sale';
  fit?: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  image: string;
  additionalImages?: string[];
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  inStock: boolean;
}

export interface CartItem {
  id: string; // unique ID combination of product.id + selectedSize + selectedColor
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
}

export interface WishlistItem {
  product: Product;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  likes: number;
  dislikes?: number;
}
