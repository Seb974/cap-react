import '../css/app.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Footer from './components/Footer';
import CategoriesPage from './pages/Category/CategoriesPage';
import CategoryPage from './pages/Category/CategoryPage';
import ProductsPage from './pages/Product/ProductsPage';
import ProductPage from './pages/Product/ProductPage';
import ProductsContext from './contexts/ProductsContext';
import CategoriesContext from './contexts/CategoriesContext';
import CartContext from './contexts/CartContext';
import AuthContext from './contexts/AuthContext';
import ProductActions from './services/ProductActions';
import CategoryActions from './services/CategoryActions';
import CartActions from './services/CartActions';
import AuthActions from './services/AuthActions';
import LoginPage from './pages/Identification/LoginPage';
import RegisterPage from './pages/Identification/RegisterPage';
import UsersPage from './pages/User/UsersPage';
import UserPage from './pages/User/UserPage';
import CartPage from './pages/Cart/CartPage';
import ProfilePage from './pages/User/ProfilePage';
import UnitPage from './pages/Unit/UnitPage';
import UnitsPage from './pages/Unit/UnitsPage';
import OrdersPage from './pages/Order/OrdersPage';
import SupplierPage from './pages/Supplier/SupplierPage';
import SuppliersPage from './pages/Supplier/SuppliersPage';
import AdminRoute from './components/AdminRoute';

AuthActions.setup();

const App = () => {

    const allCategory = {id: -1, name: "Tous"};
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [navSearch, setNavSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(allCategory);
    const [cart, setCart] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(AuthActions.isAuthenticated());
    const [currentUser, setCurrentUser] = useState(AuthActions.getCurrentUser());
    
    useEffect(() => {
        setCurrentUser(AuthActions.getCurrentUser());
        if (isAuthenticated) {
            ProductActions.findAll()
                          .then(data => {
                                setProducts(data);
                                setCart(CartActions.get(data).map(item => { return {...item, stock: 0}}));
                          })
                        .catch(error => console.log(error.response));
            CategoryActions.findAll()
                           .then(data => setCategories([allCategory,...data]));
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={ {isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser} }>
        <ProductsContext.Provider value={ {products, setProducts, navSearch, setNavSearch} }>
        <CategoriesContext.Provider value={ {categories, setCategories, selectedCategory, setSelectedCategory} }>
        <CartContext.Provider value={ {cart, setCart} }>
            <HashRouter>
                <Navbar/>
                    <main className="container pt-5">
                        <Switch>
                            <PrivateRoute path="/orders" component={ OrdersPage } />
                            <AdminRoute path="/categories/:id" component={ CategoryPage } />
                            <AdminRoute path="/categories" component={ CategoriesPage } />
                            <AdminRoute path="/units/:id" component={ UnitPage } />
                            <AdminRoute path="/units" component={ UnitsPage } />
                            <AdminRoute path="/suppliers/:id" component={ SupplierPage } />
                            <AdminRoute path="/suppliers" component={ SuppliersPage } />
                            <AdminRoute path="/products/:id" component={ ProductPage} />
                            <AdminRoute path="/products" component={ ProductsPage } />
                            <AdminRoute path="/users/:id" component={ UserPage } />
                            <AdminRoute path="/users" component={ UsersPage } />
                            <PrivateRoute path="/cart" component={ CartPage } />
                            <PrivateRoute path="/profile" component={ ProfilePage } />
                            <Route path="/login" component={ LoginPage } />
                            <Route path="/register" component={ RegisterPage } />
                            <PrivateRoute path="/" component={ Homepage } />
                        </Switch>
                    </main>
                <Footer />
            </HashRouter>
        </CartContext.Provider>
        </CategoriesContext.Provider>
        </ProductsContext.Provider>
        </AuthContext.Provider>
    );
}

const rootElement = document.querySelector("#app");
ReactDOM.render(<App/>, rootElement);

