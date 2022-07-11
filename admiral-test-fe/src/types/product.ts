export type Product = {
  id: string;
  name: string;
  type: 'virtual' | 'physical';
  minQty: number;
  price: number;
};
