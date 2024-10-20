import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import AppRoutes from './routes/index.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import store from './redux/store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <ToastContainer />
      <AppRoutes />
    </Provider>
  </React.StrictMode>,
)
  