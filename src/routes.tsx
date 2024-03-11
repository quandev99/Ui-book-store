import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom'
import UpdateOrder from './feature/admin/orders/orderUpdate';
import AccountPage from './pages/clients/customer/account';
import OrderPage from './pages/clients/customer/order';
import OrderAdmin from './feature/admin/orders';
import UpdateOrderCustomer from './pages/clients/customer/order/updateOrder';
const CustomerPage = lazy(() => import('./pages/clients/customer'))
const CheckOut = lazy(() =>  import( './pages/clients/checkout'))
const CartPage = lazy(() =>  import(   './pages/clients/cart'))
const UserList = lazy(() =>  import(  './feature/admin/users/userList'))
const UserCreate = lazy(() =>  import(  './feature/admin/users/userCreate'))
const UserUpdate = lazy(() =>  import(  './feature/admin/users/userUpdate'))
const UserTrash = lazy(() =>  import(  './feature/admin/users/userTrash'))
const ProductPage = lazy(() =>  import(  './pages/clients/product'))
const ProductDetailPage = lazy(() => import('./pages/clients/product/productDetail'))
const LayoutClient = lazy(() =>  import( './layouts/clientLayout'))
const HomePage = lazy(() =>  import( './pages/clients/home'))
const LayoutAdmin = lazy(() =>  import( './layouts/adminLayout'))
const CategoryList = lazy(() =>  import( './feature/admin/categories/categoryList'))
const CategoryCreate = lazy(() =>  import( './feature/admin/categories/categoryCreate'))
const SignIn = lazy(() =>  import( './pages/clients/signin'))
const Dashboard = lazy(() =>  import( './pages/admin/dashboard'))
const CategoryTrash = lazy(() =>  import( './feature/admin/categories/categoryTrash'))
const CategoryUpdate = lazy(() =>  import( './feature/admin/categories/categoryUpdate'))
const PublisherList = lazy(() =>  import( './feature/admin/publishers/publisherList'))
const PublisherCreate = lazy(() =>  import( './feature/admin/publishers/publisherCreate'))
const PublisherUpdate = lazy(() =>  import( './feature/admin/publishers/publisherUpdate'))
const PublisherTrash = lazy(() =>  import( './feature/admin/publishers/publisherTrash'))
const AuthorList = lazy(() =>  import( './feature/admin/authors/authorList'))
const AuthorCreate = lazy(() =>  import( './feature/admin/authors/authorCreate'))
const AuthorUpdate = lazy(() =>  import( './feature/admin/authors/authorUpdate'))
const AuthorTrash = lazy(() =>  import( './feature/admin/authors/authorTrash'))
const SupplierList = lazy(() =>  import( './feature/admin/genres/genreList'))
const SupplierCreate = lazy(() =>  import( './feature/admin/genres/genreCreate'))
const SupplierUpdate = lazy(() =>  import( './feature/admin/genres/genreUpdate'))
const SupplierTrash = lazy(() =>  import( './feature/admin/genres/genreTrash'))
const GenreList = lazy(() =>  import( './feature/admin/genres/genreList'))
const GenreCreate = lazy(() =>  import( './feature/admin/genres/genreCreate'))
const GenreUpdate = lazy(() =>  import( './feature/admin/genres/genreUpdate'))
const GenreTrash = lazy(() =>  import( './feature/admin/genres/genreTrash'))
const  ProductList = lazy(() =>  import('./feature/admin/products/productList'))
const ProductCreate = lazy(() =>  import('./feature/admin/products/productCreate'))
const ProductUpdate = lazy(() =>  import('./feature/admin/products/productUpdate'))
const ProductTrash = lazy(() => import('./feature/admin/products/productTrash'))


export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <LayoutClient />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'products',
        children: [
          { index: true, element: <ProductPage /> },
          { path: ':id', element: <ProductDetailPage /> }
        ]
      },
      { path: 'carts', element: <CartPage /> },
      {
        path: 'customer',
        element: <CustomerPage />,
        children: [
          { index: true, element: <Navigate to='account' /> },
          { path: 'account', element: <AccountPage /> },
          {
            path: 'order',
            children: [
              // { index: true, element: <OrderPage /> },
              { path: '', element: <OrderPage /> },
              { path: ':id/update', element: <UpdateOrderCustomer /> }
            ]
          }
        ]
      },
      { path: 'checkout', element: <CheckOut /> },
      { path: 'sign-in', element: <SignIn /> }
    ]
  },
  {
    path: 'admin',
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <Navigate to='dashboard' /> },
      { path: 'dashboard', element: <Dashboard /> },
      {
        path: 'products',
        children: [
          { index: true, element: <ProductList /> },
          { path: 'list', element: <ProductList /> },
          { path: 'create', element: <ProductCreate /> },
          { path: ':id/update', element: <ProductUpdate /> },
          { path: 'trash', element: <ProductTrash /> }
        ]
      },
      {
        path: 'categories',
        children: [
          { index: true, element: <CategoryList /> },
          { path: 'list', element: <CategoryList /> },
          { path: 'create', element: <CategoryCreate /> },
          { path: ':id/update', element: <CategoryUpdate /> },
          { path: 'trash', element: <CategoryTrash /> }
        ]
      },
      {
        path: 'publishers',
        children: [
          { index: true, element: <PublisherList /> },
          { path: 'list', element: <PublisherList /> },
          { path: 'create', element: <PublisherCreate /> },
          { path: ':id/update', element: <PublisherUpdate /> },
          { path: 'trash', element: <PublisherTrash /> }
        ]
      },
      {
        path: 'suppliers',
        children: [
          { index: true, element: <SupplierList /> },
          { path: 'list', element: <SupplierList /> },
          { path: 'create', element: <SupplierCreate /> },
          { path: ':id/update', element: <SupplierUpdate /> },
          { path: 'trash', element: <SupplierTrash /> }
        ]
      },
      {
        path: 'genres',
        children: [
          { index: true, element: <GenreList /> },
          { path: 'list', element: <GenreList /> },
          { path: 'create', element: <GenreCreate /> },
          { path: ':id/update', element: <GenreUpdate /> },
          { path: 'trash', element: <GenreTrash /> }
        ]
      },
      {
        path: 'authors',
        children: [
          { index: true, element: <AuthorList /> },
          { path: 'list', element: <AuthorList /> },
          { path: 'create', element: <AuthorCreate /> },
          { path: ':id/update', element: <AuthorUpdate /> },
          { path: 'trash', element: <AuthorTrash /> }
        ]
      },
      {
        path: 'users',
        children: [
          { index: true, element: <UserList /> },
          { path: 'list', element: <UserList /> },
          { path: 'create', element: <UserCreate /> },
          { path: ':id/update', element: <UserUpdate /> },
          { path: 'trash', element: <UserTrash /> }
        ]
      },
      {
        path: 'orders',
        children: [
          { index: true, element: <OrderAdmin /> },
          { path: 'list', element: <OrderAdmin /> },
          { path: ':id/update', element: <UpdateOrder /> }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <div>nofound</div>
  }
])