// Product and Cart types for the e-commerce application

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'electronics' | 'clothing' | 'shoes';
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CheckoutFormData {
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  paymentMethod: 'card' | 'paypal' | 'crypto';
}

export type ViewState = 'products' | 'cart' | 'checkout' | 'success';

export type Category = 'all' | 'electronics' | 'clothing' | 'shoes';
