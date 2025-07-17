import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import OrderTracking from './components/OrderTracking';
import OrderHistory from './components/OrderHistory';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import styles from './styles.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/" exact component={Home} />
            <Route path="/products" component={ProductList} />
            <Route path="/product/:id" component={ProductDetail} />
            <PrivateRoute path="/cart" component={Cart} />
            <PrivateRoute path="/checkout" component={Checkout} />
            <PrivateRoute path="/order/:id" component={OrderTracking} />
            <PrivateRoute path="/orders" component={OrderHistory} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
