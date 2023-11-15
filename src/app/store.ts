import { configureStore } from '@reduxjs/toolkit'
import { apiCategory } from './services/category'
import { apiImage } from './services/image'
import { apiPublisher } from './services/publisher'
import { apiAuthor } from './services/author'
import { apiSupplier } from './services/supplier'
import { apiGenre } from './services/genre'
import { apiProduct } from './services/product'
import { apiUser } from './services/user'

export const store = configureStore({
  reducer: {
    [apiProduct.reducerPath]: apiProduct.reducer,
    [apiCategory.reducerPath]: apiCategory.reducer,
    [apiPublisher.reducerPath]: apiPublisher.reducer,
    [apiAuthor.reducerPath]: apiAuthor.reducer,
    [apiSupplier.reducerPath]: apiSupplier.reducer,
    [apiGenre.reducerPath]: apiGenre.reducer,
    [apiUser.reducerPath]: apiUser.reducer,
    [apiImage.reducerPath]: apiImage.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiProduct.middleware,
      apiCategory.middleware,
      apiImage.middleware,
      apiPublisher.middleware,
      apiSupplier.middleware,
      apiAuthor.middleware,
      apiGenre.middleware,
      apiUser.middleware
    )
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch