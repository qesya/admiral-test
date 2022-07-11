import { CartType } from 'src/types';

export const Routes = {
  HOME: '/',
  CHECKOUT: '/checkout',
};

export type CheckoutParamsType = {
  products: CartType[];
  total: number;
};
