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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<LoadingPage loading={true} />}>
        <ToastContainer />
        <AppRoutes />
      </Suspense>
    </Provider>
  </React.StrictMode>,
);
