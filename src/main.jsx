import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import AppRoutes from './routes/index.jsx';
import './index.css'
import store from './redux/store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>,
)
  