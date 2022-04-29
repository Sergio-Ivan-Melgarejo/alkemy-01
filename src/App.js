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
import Msg from './components/Msg';

// Reducer
import { useEffect, useReducer } from 'react';
import MenuReducer, { MenuInitialState } from './reducers/MenuReducer';
import { TYPES } from './actions/MenuActions';

function App() {
  const [state, dispatch] = useReducer(MenuReducer, MenuInitialState)

  const handleAdd = (data) => dispatch({type:TYPES.ADD_PLATE,payload:data})
  const handleDelete = (id) => dispatch({type:TYPES.DELETE_PLATE,payload:id})
  const handleReset = () => dispatch({type:TYPES.RESET})
  const handleOrder = () => dispatch({type:TYPES.ORDER})
  const handleGetData = () => dispatch({type:TYPES.GET_DATA})

  useEffect(() => {
    handleGetData()
  }, [])
  
  return (
    <main className="App container-fluid container-xl grid p-0">
      <Msg />
      <LoginProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home state={state} handleDelete={handleDelete} handleReset={handleReset} handleOrder={handleOrder} />} ></Route>
            <Route path='/login' element={<Login />} ></Route>
            <Route path='/search/' element={<Search handleAdd={handleAdd} /> } >
                <Route path=':search' element={<List />} />
            </Route>
            <Route path='/details/:id' element={<Details handleAdd={handleAdd} state={state} /> } />
            <Route path='*' element={<Error />} ></Route>
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </main>
  );
}

export default App;
