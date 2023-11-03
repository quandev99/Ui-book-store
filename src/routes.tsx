import { Navigate, createBrowserRouter } from 'react-router-dom'
import LayoutClient from './layouts/clientLayout'
import HomePage from './pages/clients/home'
import LayoutAdmin from './layouts/adminLayout'
import CategoryList from './feature/admin/categories/categoryList'
import CategoryCreate from './feature/admin/categories/categoryCreate'
import SignIn from './pages/clients/signin'
import Dashboard from './pages/admin/dashboard'
import CategoryTrash from './feature/admin/categories/categoryTrash'
import CategoryUpdate from './feature/admin/categories/categoryUpdate'
import PublisherList from './feature/admin/publishers/publisherList'
import PublisherCreate from './feature/admin/publishers/publisherCreate'
import PublisherUpdate from './feature/admin/publishers/publisherUpdate'
import PublisherTrash from './feature/admin/publishers/publisherTrash'
import AuthorList from './feature/admin/authors/authorList'
import AuthorCreate from './feature/admin/authors/authorCreate'
import AuthorUpdate from './feature/admin/authors/authorUpdate'
import AuthorTrash from './feature/admin/authors/authorTrash'
import SupplierList from './feature/admin/genres/genreList'
import SupplierCreate from './feature/admin/genres/genreCreate'
import SupplierUpdate from './feature/admin/genres/genreUpdate'
import SupplierTrash from './feature/admin/genres/genreTrash'
import GenreList from './feature/admin/genres/genreList'
import GenreCreate from './feature/admin/genres/genreCreate'
import GenreUpdate from './feature/admin/genres/genreUpdate'
import GenreTrash from './feature/admin/genres/genreTrash'


export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <LayoutClient />,
    children: [
      { index: true, element: <HomePage /> },
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
      }
    ]
  },
  {
    path: '*',
    element: <div>nofound</div>
  }
])