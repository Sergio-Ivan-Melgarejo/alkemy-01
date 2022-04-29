import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

// context
import LoginContext from "../Context/LoginContext"

// Component
import List from '../components/List';
import Nav from '../components/Nav';
import HeaderSearch from '../components/HeaderSearch';
import Loader from '../components/Loader';

// hooks
import useValidateLogin from '../hooks/useValidateLogin';

// library
const axios = require('axios');
const Swal = require('sweetalert2');

// const apiKey = "&apiKey=4de1fd1a670b4ffa9f593ed9053f9dcc";
const apiKey = "&apiKey=924dc1bcfdc2458198015894591bfd2f"

const Search = ({handleAdd}) => {
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(true)

  // redirige a login si no esta registrado
  useValidateLogin()
  const {login} = useContext(LoginContext)

  // obtiene parametros de la url
  const {search} = useLocation()
  const params = new URLSearchParams(search)
  const paramsQuery = params.get("query")

  useEffect(() => {
    // evita buscar si no esta registrado
    if(login){

    // inicia la busqueda
    setLoader(true)

      // busca con la url
      if(search){

        const functionAsync = async () =>{
          // La consulta de búsqueda de recetas
          let url = `https://api.spoonacular.com/recipes/complexSearch?query=${paramsQuery}`;
          
          // El número de resultados esperados (entre 1 y 100).
          const paramsNumber = params.get("number")
          if(paramsNumber) url += `&number=${paramsNumber}`

          // diet para que las recetas sean adecuadas.
          const paramsdiet = params.get("diet")
          if(paramsdiet) url += `&diet=${paramsdiet}`
          
          url += apiKey

          axios.get(url)
          .then(function (res) {
            // handle success
            // console.log(res);
            if(res.status === 200) setData(res.data.results)

            // termina de buscar
            setLoader(false)
          })
          .catch(function (error) {
            // handle error
            // console.log(error);

            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'The server did not respond, please try again later.',  
              background: "#232323",
              color: "#fff"
            })

            // termina de buscar
            setLoader(false)
          })
        }
        functionAsync()
      }

      // si esta vacio, mostrara recetas aleatorias
      if(!search){

        const functionAsync = async () =>{
          axios.get(`https://api.spoonacular.com/recipes/random?number=100${apiKey}`)
          .then(function (res) {
            // handle success
            // console.log(res);
            if(res.status === 200) setData(res.data.recipes)

            // termina de buscar
            setLoader(false)
          })
          .catch(function (error) {
            // handle error
            // console.log(error);
            
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'The server did not respond, please try again later.',  
              background: "#232323",
              color: "#fff"
            })

            // termina de buscar
            setLoader(false)
          })
   
        }
        functionAsync()
      }
    }
  }, [search])

  return (
    <>
      <Nav />
      <div className='p-3'>
        <HeaderSearch title={paramsQuery} />
        <div className={(loader ? "justify-content-center align-items-center " : "" ) + 'p-sm-3 row'}>
          { 
            loader
              ? <Loader />
              : <List data={data} handleAdd={handleAdd} />
          }
        </div>
      </div>
    </>
  )
}

export default Search