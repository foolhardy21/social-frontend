import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ExploreFeedPage, Home, Login, Signup, UserFeedPage, BookmarksFeedPage, Profile } from 'pages';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/explore' element={<ExploreFeedPage />} />
        <Route path='/myfeed' element={<UserFeedPage />} />
        <Route path='/bookmarks' element={<BookmarksFeedPage />} />
        <Route path='/:username' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
