import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Login, Signup } from './pages';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/login' element={<Login />} />

        <Route path='/signup' element={<Signup />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
