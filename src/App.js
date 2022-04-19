import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Explore, Home, Login, Signup, UserFeed } from 'pages';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/login' element={<Login />} />

        <Route path='/signup' element={<Signup />} />

        <Route path='/explore' element={<Explore />} />

        <Route path='/home' element={<UserFeed />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
