import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// scss
import '@flaticon/flaticon-uicons/css/all/all.css'
import "@fortawesome/fontawesome-free/css/all.css"
import "choices.js/public/assets/styles/choices.min.css"
import './assets/vendor/flaticon/css/flaticon.css'
import './assets/scss/kivicare.scss'
import './assets/scss/custom.scss'
import './assets/scss/customizer.scss'
import './assets/scss/rtl.scss'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { IndexRouter } from './router/indexRouter.jsx';

// store
import { store } from "./store/index";
import { Provider } from "react-redux";

const router = createBrowserRouter (
  [
    ...IndexRouter
  ], {
    basename: import.meta.env.BASE_URL
  }
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App>
      <RouterProvider router={router}></RouterProvider>
      </App>
    </Provider>
  </React.StrictMode>,
)
