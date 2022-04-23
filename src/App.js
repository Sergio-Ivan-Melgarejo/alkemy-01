// React
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages
import Home from './Pages/Home';
import Login from './Pages/Login';

// Style
import './App.scss';

// Data
import { LoginProvider } from "./Context/LoginContext"

// 
const apiKey = "686f575f9b6b4d24896e94979d3c22ae";
const axios = require('axios');

function App() {
  const [login, setLogin] = useState({login: false})

  useEffect(() => {
    const functionAsync = async () =>{
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
      <LoginProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} ></Route>
            <Route path='/login' element={<Login />} ></Route>
          </Routes>
    
        </BrowserRouter>
      </LoginProvider>
    </div>
  );
}

export default App;
