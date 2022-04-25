import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import List from '../components/List';
import Nav from '../components/Nav';
import HeaderSearch from '../components/HeaderSearch';
import LoginContext from '../Context/LoginContext';

const axios = require('axios');

const Search = () => {
  // redirige a login si no esta registrado
  const navigate = useNavigate()
  const {login} = useContext(LoginContext)
  useEffect(() => {
      if(!login) navigate("/login")
  }, [login,navigate])

  useEffect(() => {
    if(login){
      const functionAsync = async () =>{

        const apiKey = "&apiKey=686f575f9b6b4d24896e94979d3c22ae";
        // La consulta de búsqueda de recetas
        const query = `query=pasta`
        // El número de resultados esperados (entre 1 y 100).
        const number = `&number=10`
        // El número de resultados esperados (entre 1 y 100).
        const diet = `&diet=vegetarian`
      
        axios.get(`https://api.spoonacular.com/recipes/complexSearch?${query}${number}${apiKey}${diet}`)
        .then(function (response) {
          // handle success
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
      }
      functionAsync()
    }
  }, [])

  const params = useParams();
  console.log(params)

  return (
    <>
        <Nav />
        <HeaderSearch title={params.search !== undefined ? params.search : "Recetas"} />
        { 
          params.search !== undefined 
            ? <Outlet />
            : <List search={params.search} />
        }
    </>
  )
}

export default Search