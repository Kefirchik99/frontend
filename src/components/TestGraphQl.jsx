import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { CREATE_ORDER } from "../graphql/mutations";

// Query to fetch all orders
const GET_ORDERS = gql`
  query {
    orders {
      id
    }
  }
`;

const TestGraphQl = () => {
    const [response, setResponse] = useState("");

    // Fetch Orders Query
    const { data, loading, error, refetch } = useQuery(GET_ORDERS);

    // Create Order Mutation
    const [createOrder] = useMutation(CREATE_ORDER);

    // Create Order Handler
    const handleCreateOrder = async () => {
        try {
            const { data } = await createOrder({
                variables: { productId: 1, quantity: 1 },
            });
            setResponse(`Order Created: ${data.createOrder}`);
            refetch(); // Refetch orders to update the order count
        } catch (error) {
            console.error("Error creating order:", error.message);
            setResponse(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>GraphQL Test Component</h1>

            {/* Create Order Button */}
            <button onClick={handleCreateOrder}>Create Order</button>
            <p>{response}</p>

            {/* Order Count Section */}
            <h2>Order Count</h2>
            {loading && <p>Loading orders...</p>}
            {error && <p>Error fetching orders: {error.message}</p>}
            {data && <p>Total Orders: {data.orders.length}</p>}
        </div>
    );
};

export default TestGraphQl;
