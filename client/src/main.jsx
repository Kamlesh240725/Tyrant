import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { Provider } from "react-redux";

import GoogleAuthProvider from "./context/GoogleAuth";
import ShoppingPopUpProvider from "./context/ShoppingPopUpContext";
import { store } from "./redux/Store";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <GoogleAuthProvider>
        <ShoppingPopUpProvider>
          <BrowserRouter>
          <App />
          </BrowserRouter>
        </ShoppingPopUpProvider>
      </GoogleAuthProvider>
    </Provider>
  </>,
);
