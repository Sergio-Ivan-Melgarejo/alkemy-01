// React
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages
import Home from './Pages/Home';
import Login from './Pages/Login';

// Style
import './App.scss';

// Data
import UserContext from "./Context/UserContext"

// 
const apiKey = "686f575f9b6b4d24896e94979d3c22ae";
const axios = require('axios');

function App() {
  const [login, setLogin] = useState({login: false})

  useEffect(() => {
    const functionAsync = async () =>{
      // Logged
      axios.post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      
      //
      axios.get('https://catfact.ninja/fact')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function (res) {
        // always executed
        console.log(res)
      });
    }
  }, [])


  return (
    <div className="App container">
      <UserContext.Provider value={{login: false}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} ></Route>
            <Route path='/login' element={<Login />} ></Route>
          </Routes>
    
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
