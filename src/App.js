import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Explore, Home, Login, Signup, UserFeed } from 'pages';
import Bookmarks from 'pages/Bookmarks';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/login' element={<Login />} />

        <Route path='/signup' element={<Signup />} />

        <Route path='/explore' element={<Explore />} />

        <Route path='/home' element={<UserFeed />} />

        <Route path='/bookmarks' element={<Bookmarks />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
