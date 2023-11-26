import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'



import { apiCategory } from './services/category'
import { apiImage } from './services/image'
import { apiPublisher } from './services/publisher'
import { apiAuthor } from './services/author'
import { apiSupplier } from './services/supplier'
import { apiGenre } from './services/genre'
import { apiProduct } from './services/product'
import { apiUser } from './services/user'
import authReducer from '../store/authSlice/authSlice'
import { apiAuth } from './services/auth'


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authSlice']
}
const rootReducer = combineReducers({
  [apiProduct.reducerPath]: apiProduct.reducer,
  [apiCategory.reducerPath]: apiCategory.reducer,
  [apiPublisher.reducerPath]: apiPublisher.reducer,
  [apiAuthor.reducerPath]: apiAuthor.reducer,
  [apiSupplier.reducerPath]: apiSupplier.reducer,
  [apiGenre.reducerPath]: apiGenre.reducer,
  [apiUser.reducerPath]: apiUser.reducer,
  [apiImage.reducerPath]: apiImage.reducer,
  [apiAuth.reducerPath]: apiAuth.reducer,
  authSlice: authReducer
})

const attinalMiddleware = [
  apiProduct.middleware,
  apiCategory.middleware,
  apiImage.middleware,
  apiPublisher.middleware,
  apiSupplier.middleware,
  apiAuthor.middleware,
  apiGenre.middleware,
  apiUser.middleware,
  apiAuth.middleware
]
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(...attinalMiddleware)
})

const persister = persistStore(store)
export default persister

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>