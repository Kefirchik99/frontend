import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrder($productId: Int!, $quantity: Int!) {
    createOrder(productId: $productId, quantity: $quantity)
  }
`;
