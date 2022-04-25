import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import List from '../components/List';
import Nav from '../components/Nav';
import HeaderSearch from '../components/HeaderSearch';
import LoginContext from '../Context/LoginContext';
import MsgError from '../components/MsgError';

const axios = require('axios');

const Search = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)

  // redirige a login si no esta registrado
  const navigate = useNavigate()
  const {login} = useContext(LoginContext)
  useEffect(() => {
      if(!login) navigate("/login")
  }, [login,navigate])

  // busca segun url
  const params = useParams();
  // console.log(params)

  useEffect(() => {
    // evita buscar si no esta registrado
    if(login){
      // buca la url
      if(params.search){
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

      // mostrara recetas aleatorias
      if(!params.search){
        const functionAsync = async () =>{

          const apiKey = "&apiKey=686f575f9b6b4d24896e94979d3c22ae";
          
          axios.get(`https://api.spoonacular.com/recipes/random?number=100${apiKey}`)
          .then(function (res) {
            // handle success
            // console.log(res);
            if(res.status === 200) setData(res.data.recipes)
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            setError("El server no responde, vuelva a intentar mas tarder.")
          })
        }
        functionAsync()
      }
    }
  }, [])


  return (
    <>
        <Nav />
        <HeaderSearch title={params.search} />
        { 
          params.search !== undefined 
            ?  <Outlet />
            : <>
                {
                  error
                  ? <MsgError msg={error} />
                  : <List data={data} />

                }
              </>
        }
    </>
  )
}

export default Search