import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './bootstrap.custom.css'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import Profile from './pages/Profile'
import OrderList from './pages/admin/OrderList'
import ProductList from './pages/admin/ProductList'
import ProductEdit from './pages/admin/ProductEdit'
import UserList from './pages/admin/UserList'
import UserEdit from './pages/admin/UserEdit'
import store from './redux/store'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/search/:keyword' element={<Home />} />
      <Route path='/page/:pageNumber' element={<Home />} />
      <Route path='/search/:keyword/page/:pageNumber' element={<Home />} />
      <Route path='/product/:id' element={<Product />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/order/:id' element={<Order />} />
        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/productlist' element={<ProductList />} />
        <Route path='/admin/orderlist' element={<OrderList />} />
        <Route
          path='/admin/productlist/:pageNumber'
          element={<ProductList />}
        />
        <Route path='/admin/product/:id/edit' element={<ProductEdit />} />
        <Route path='/admin/userlist' element={<UserList />} />
        <Route path='/admin/user/:id/edit' element={<UserEdit />} />
      </Route>
    </Route>
  )
)

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
)

reportWebVitals()
