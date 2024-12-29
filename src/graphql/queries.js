import { gql } from "@apollo/client";

// Query to get products with a category filter
export const GET_PRODUCTS_WITH_FILTER = gql`
  query GetProducts($category: String) {
    products(category: $category) {
      id
      name
      inStock
      gallery
      price
    }
  }
`;

// Query to get all categories
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

// Query to get all products
export const GET_PRODUCTS = gql`
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

// Query to get product details by ID
export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($id: ID!) {
    product(id: $id) {
      id
      name
      description
      gallery
      price
      inStock
      attributes {
        id
        name
        type
        value
        items {
          id
          displayValue
          value
        }
      }
    }
  }
`;
