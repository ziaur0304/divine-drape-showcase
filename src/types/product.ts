export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  images?: string[];
  category: string;
  sizes?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
