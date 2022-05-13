import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider, ModalProvider, PostsProvider, ProfileProvider } from "contexts";
import { makeServer } from "./server";
import { BookmarksProvider } from "contexts";
import { CommentsProvider } from "contexts/comments.context";

// Call make Server
makeServer();

ReactDOM.render(
  <AuthProvider>
    <PostsProvider>
      <CommentsProvider>
        <BookmarksProvider>
          <ProfileProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </ProfileProvider>
        </BookmarksProvider>
      </CommentsProvider>
    </PostsProvider>
  </AuthProvider>,
  document.getElementById("root")
);
