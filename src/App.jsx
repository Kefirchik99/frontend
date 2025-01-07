import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import AppRoutes from './routes';

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <main>
          <AppRoutes />
        </main>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
