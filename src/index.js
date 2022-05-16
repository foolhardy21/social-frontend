import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider, ModalProvider, PostsProvider, ProfileProvider } from "contexts";
import { makeServer } from "./server";
import { BookmarksProvider } from "contexts";
import { CommentsProvider } from "contexts/comments.context";
import { Provider } from "react-redux";
import { store } from "app/store";

// Call make Server
makeServer();

ReactDOM.render(
  <AuthProvider>
    <PostsProvider>
      <CommentsProvider>
        <BookmarksProvider>
          <ProfileProvider>
            <ModalProvider>
              <Provider store={store}>
                <App />
              </Provider>
            </ModalProvider>
          </ProfileProvider>
        </BookmarksProvider>
      </CommentsProvider>
    </PostsProvider>
  </AuthProvider>
  ,
  document.getElementById("root")
);
