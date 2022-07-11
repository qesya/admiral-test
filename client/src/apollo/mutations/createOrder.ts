import { gql } from '@apollo/client';

export type ProductMutation = {
  id: string;
  qty: number;
  giftWrap: {
    name: string;
    charge: number;
  } | null;
  total: number;
};

export type CreateOrderInput = {
  input: {
    products: ProductMutation[];
    taxPercentage: number;
    total: number;
  };
};

export type CreateOrderResponse = {
  id: string;
  products: {
    id: string;
    price: number;
  };
  giftWrap: {
    name: string;
    charge: number;
  };
  tax: number;
};

export const CREATE_ORDER = gql`
  mutation createOrder($input: OrderCreateInput!) {
    createOrder(input: $input) {
      id
      products {
        id
      }
      tax
      taxPercentage
      vat
    }
  }
`;
