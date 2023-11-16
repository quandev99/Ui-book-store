import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import 'slick-carousel/slick/slick.scss'; 
import 'slick-carousel/slick/slick-theme.scss'
import './assets/styles/index.scss'
import { store } from './app/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
