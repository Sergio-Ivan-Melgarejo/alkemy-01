import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoginContext from '../Context/LoginContext'

// Hooks
import useValidateLogin from '../hooks/useValidateLogin'

// Components
import Nav from '../components/Nav'
import Loader from '../components/Loader'

const axios = require("axios")

const apiKey = "&apiKey=4de1fd1a670b4ffa9f593ed9053f9dcc";

const Details = () => {
    const [loader, setLoader] = useState(true)
    const [data, setData] = useState({})

    // redirige a login si no esta registrado
    useValidateLogin()
    const {login} = useContext(LoginContext)

    // busca por url
    const {id} = useParams()
console.log(id)

    useEffect(() => {
        // evita buscar si no esta registrado
        if(login){
            // inicia la busqueda
            setLoader(true)
        
            // busca con la url
            if(id){
                const functionAsync = async () =>{
                  // La consulta de búsqueda de recetas
                  let url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true${apiKey}`;
        
                  url += apiKey
        
                  axios.get(url)
                  .then(function (res) {
                    // handle success
                    console.log(res);
                    if(res.status === 200) setData(res.data.results)
        
                    // termina de buscar
                    setLoader(false)
                  })
                  .catch(function (error) {
                    // handle error
                    console.log(error);
                    
                    // termina de buscar
                    setLoader(false)
                  })
                }
                functionAsync()
            }
        }
    }, [id])
    

    return (
        <>
            <Nav />
            <div className='p-3 row w-100 m-auto'>
                {
                    loader
                    ?   <Loader />
                    :   <h1>Cargado</h1> 
                }
            </div>
        </>
    )
}

export default Details