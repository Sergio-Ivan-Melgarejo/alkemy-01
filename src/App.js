// React
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages
import Home from './Pages/Home';
import Login from './Pages/Login';
import Search from './Pages/Search'
;
// Componentes
import List from './components/List';

// Style
import './App.scss';

// Data
import { LoginProvider } from "./Context/LoginContext"

function App() {

  return (
    <main className="App container-fluid container-xl">
      <LoginProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} ></Route>
            <Route path='/login' element={<Login />} ></Route>
            <Route path='/search' element={<Search /> } >
                <Route path=':search' element={<List />} />
            </Route>
            <Route path='*' element={<h1>error</h1>} ></Route>
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </main>
  );
}

export default App;
