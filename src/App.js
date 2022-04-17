import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, Signup } from './pages';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<Login />} />

        <Route path='/signup' element={<Signup />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
