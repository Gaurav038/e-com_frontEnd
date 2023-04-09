import React, { useState, useEffect, Suspense} from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store"
import { loadUser} from './actions/userAction';
import axios from 'axios';
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import ProtectedRoute from './component/Route/ProtectedRoute';

import { BASE_URL } from './API';
import Payment from "./component/Cart/Payment"
import Loader from './component/layout/Loader/Loader';
import Header from "./component/layout/Headersss/Header.jsx"
import Footer from './component/layout/Footer/Footer'
import Shipping from "./component/Cart/Shipping"
import ConfirmOrder from './component/Cart/ConfirmOrder';
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetails from "./component/Order/OrderDetails.js"


const Home = React.lazy(() => import('./component/Home/Home'))
const ProductDetails = React.lazy(() => import("./component/Product/ProductDetails"))
const Products = React.lazy(() => import("./component/Product/Products.js"))
const LoginSignUp = React.lazy(() => import("./component/User/LoginSignUp"))
const Profile = React.lazy(() => import("./component/User/Profile"))
const UpdateProfile = React.lazy(() => import("./component/User/UpdateProfile.js"))
const UpdatePassword = React.lazy(() => import("./component/User/UpdatePassword.js"))
const ForgotPassword = React.lazy(() => import('./component/User/ForgotPassword'))
const ResetPassword = React.lazy(() => import("./component/User/ResetPassword"))
const Cart = React.lazy(() => import('./component/Cart/Cart'))



// ----------admin----------------
const Dashboard = React.lazy(() => import('./component/Admin/Dashboard'));
const ProductList = React.lazy(() => import('./component/Admin/ProductList'));
const NewProduct = React.lazy(() => import('./component/Admin/NewProduct'));
const UpdateProduct = React.lazy(() => import('./component/Admin/UpdateProduct'));
const OrderList = React.lazy(() => import('./component/Admin/OrderList'));
const ProcessOrder = React.lazy(() => import('./component/Admin/ProcessOrder'));
const UsersList = React.lazy(() => import('./component/Admin/UsersList'));
const UpdateUser = React.lazy(() => import('./component/Admin/UpdateUser'));
const ProductReviews = React.lazy(() => import('./component/Admin/ProductReviews'));


export default function App() {

  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey() {
    const {data} = await axios.get(`${BASE_URL}/stripeapikey`, {withCredentials: true, credentials: 'include'})
    setStripeApiKey(data.stripeApiKey)
  }
  
    useEffect(() => {
        store.dispatch(loadUser())

        getStripeApiKey();
    }, [])    
  
    // -------------No person can inspect it-----------------
    // window.addEventListener("contextmenu", (e) => e.preventDefault())

    return (
        <Router>   
                <Header />

                {stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)} >
                  <ProtectedRoute exact path="/process/payment" component={Payment} />
                </Elements>}

                <Switch>       
                
                <Route exact path="/order/confirm" component={ConfirmOrder} />
                <ProtectedRoute exact path="/shipping" component={Shipping} />
                <ProtectedRoute exact path="/success" component={OrderSuccess} />
                <ProtectedRoute exact path="/orders" component={MyOrders} />
                <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

                {/*---------- adminPart---------------- */}
                <Suspense fallback = {<Loader />} >
                <Route exact path="/" component={Home} />
                <Route exact path="/product/:id" component={ProductDetails} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/products/:keyword" component={Products} />
                <ProtectedRoute exact path="/account" component={Profile} />
                <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
                <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
                <Route exact path="/password/forgot" component={ForgotPassword} />
                <Route exact path="/password/reset/:token" component={ResetPassword} />
                <Route exact path="/login" component={LoginSignUp} />
                <Route exact path="/cart" component={Cart} />

                <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
                <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList} />
                <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct} />
                <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={UpdateProduct} />
                <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList} />
                <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder} />
                <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UsersList} />
                <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />
                <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ProductReviews} />
                
                </Suspense>

                </Switch> 
                <Footer />   
        </Router>
    )
}
