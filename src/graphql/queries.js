import { gql } from "@apollo/client";

export const GET_PRODUCTS_WITH_FILTER = gql`
  query GetProducts($category: String) {
    products(category: $category) {
      id
      name
      inStock
    }
  }
`;


export const GET_CATEGORIES = `
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export const GET_PRODUCTS = `
  query GetProducts {
    products {
      id
      name
      attributes {
        name
        value
        type
      }
    }
  }
`;
