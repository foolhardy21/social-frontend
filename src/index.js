import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider, ModalProvider } from "contexts";
import { makeServer } from "./server";
import { Provider } from "react-redux";
import { store } from "app/store";

// Call make Server
makeServer();

ReactDOM.render(
  <AuthProvider>
    <ModalProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ModalProvider>
  </AuthProvider>
  ,
  document.getElementById("root")
);
