import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Create from './pages/Create';
import Update from './pages/Update';
import Books from './pages/Books';
import Nav from './pages/Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Books />}></Route>
        <Route path='/create' element={<Create />}></Route>
        <Route path='/update/:id' element={<Update />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
