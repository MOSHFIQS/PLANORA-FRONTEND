import { Category } from "./category.type";

export interface Variant {
  id?: string;
  variant?: string;
  price: number;
  originalPrice: number;
  stock: number;
  productId?: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface ProductImage {
     id: string;
     name: string;
     img: string;
     imageUploading?: boolean;
}

export interface Product {
     id: string;
     name: string;
     productCode: string;
     description: string;
     descriptionImage?: string;
     images: string[];
     availability:
          | "PUBLISHED"
          | "IN_STOCK"
          | "OUT_OF_STOCK"
          | "DISCONTINUED"
          | "DELETED"
          | "UP_COMING";
     freeHomeDelivery: boolean;
     categoryId: string;
     category?: Category;
     variants: Variant[];
}
