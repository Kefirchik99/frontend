import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import AppRoutes from './routes';
import './styles/index.scss';

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="container">
          <Header />
          <main>
            <AppRoutes />
          </main>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
