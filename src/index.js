import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider, PostsProvider } from "contexts";
import { makeServer } from "./server";
import { BookmarksProvider } from "contexts";

// Call make Server
makeServer();

ReactDOM.render(
  <AuthProvider>
    <PostsProvider>
      <BookmarksProvider>
        <App />
      </BookmarksProvider>
    </PostsProvider>
  </AuthProvider>,
  document.getElementById("root")
);
