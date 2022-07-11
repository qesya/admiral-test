import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import './App.css';
import { apolloClient } from './apollo/client';
import { Routes as ROUTES } from './constants/routes';
import { Checkout, Home } from './pages';

function App() {
  return (
    <div className="flex">
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;
