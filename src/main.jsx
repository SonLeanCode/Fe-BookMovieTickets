import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import AppRoutes from "./routes/index.jsx";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import store from "./redux/store.js";
import LoadingPage from "./pages/Loading/LoadingSpinner.jsx";
import i18n from "./i18n/i18n.js";
import { I18nextProvider } from 'react-i18next';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<LoadingPage loading={true} />}>
        <ToastContainer />
        <I18nextProvider i18n={i18n}>

        <AppRoutes />
        </I18nextProvider>
      </Suspense>
    </Provider>
  </React.StrictMode>,
);
