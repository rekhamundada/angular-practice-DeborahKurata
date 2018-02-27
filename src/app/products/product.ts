// export interface IProduct {
//   productId: number;
//   productName: string;
//   productCode: string;
//   releaseDate: string;
//   description: string;
//   price: number;
//   starRating: number;
//   imageUrl: string;
// }
export interface IProduct {
  id: number | null;
  productName: string;
  productCode: string;
  category: string;
  tags?: string[];
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}
