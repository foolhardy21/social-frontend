import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider, PostsProvider } from "./contexts";
import { makeServer } from "./server";

// Call make Server
makeServer();

ReactDOM.render(
  <AuthProvider>
    <PostsProvider>
      <App />
    </PostsProvider>
  </AuthProvider>,
  document.getElementById("root")
);
