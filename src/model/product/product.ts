export interface Product {
  id?: number;
  name?: string;
  brand?: string;
  category?: string;
  description?: string;
  price?: number | string;
  rating?: string | number;
  numOfReviews?: number;
  countInStock?: string;
  createdAt?: string;
  updatedAt?: string;
  imageUrls?: [];
}

export interface Image {
  url?: string;
}

export interface ProductCheckout {
  id?: number;
  name?: string;
  brand?: string;
  category?: string;
  images: Image[];
}
