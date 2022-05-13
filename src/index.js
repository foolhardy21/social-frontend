import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider, ModalProvider, PostsProvider, ProfileProvider } from "contexts";
import { makeServer } from "./server";
import { BookmarksProvider } from "contexts";

// Call make Server
makeServer();

ReactDOM.render(
  <AuthProvider>
    <PostsProvider>
      <BookmarksProvider>
        <ProfileProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </ProfileProvider>
      </BookmarksProvider>
    </PostsProvider>
  </AuthProvider>,
  document.getElementById("root")
);
