// React
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages
import Home from './Pages/Home';
import Login from './Pages/Login';
import Search from './Pages/Search';
import Details from './Pages/Details';
import Error from './Pages/Error';

// Componentes
import List from './components/List';

// Style
import './App.scss';

// Data
import { LoginProvider } from "./Context/LoginContext"

function App() {

  return (
    <main className="App container-fluid container-xl grid p-0">
      <LoginProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} ></Route>
            <Route path='/login' element={<Login />} ></Route>
            <Route path='/search/' element={<Search /> } >
                <Route path=':search' element={<List />} />
            </Route>
            <Route path='/details/:id' element={<Details /> } />
            <Route path='*' element={<Error />} ></Route>
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </main>
  );
}

export default App;
