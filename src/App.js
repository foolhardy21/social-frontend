import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ExploreFeedPage, Home, Login, Signup, UserFeedPage, BookmarksFeedPage, Profile, PostPage, FollowersPage } from 'pages';
import RequireAuth from 'components/RequireAuth';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/explore' element={
          <RequireAuth>
            <ExploreFeedPage />
          </RequireAuth>
        } />
        <Route path='/myfeed' element={
          <RequireAuth>
            <UserFeedPage />
          </RequireAuth>
        } />
        <Route path='/bookmarks' element={
          <RequireAuth>
            <BookmarksFeedPage />
          </RequireAuth>
        } />
        <Route path='/:username/post/:postId' element={
          <RequireAuth>
            <PostPage />
          </RequireAuth>
        } />
        <Route path='/:username' element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        } />
        <Route path='/:username/followers' element={
          <RequireAuth>
            <FollowersPage />
          </RequireAuth>
        } />
        <Route path='/:username/following' element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
