import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoginContext from '../Context/LoginContext'
import "./Details.scss"

// Hooks
import useValidateLogin from '../hooks/useValidateLogin'

// Components
import Nav from '../components/Nav'
import Loader from '../components/Loader'
import Description from '../components/Description'

// library
const axios = require("axios")
const Swal = require('sweetalert2')

const apiKey = "&apiKey=4de1fd1a670b4ffa9f593ed9053f9dcc";

const Details = ({handleAdd}) => {
    const [loader, setLoader] = useState(true)
    const [data, setData] = useState({})

    // redirige a login si no esta registrado
    useValidateLogin()
    const {login} = useContext(LoginContext)

    // busca por url
    const {id} = useParams()

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
                    // console.log(res);
                    if(res.status === 200) setData(res.data)
        
                    // termina de buscar
                    setLoader(false)
                  })
                  .catch(function (error) {
                    // handle error
                    // console.log(error);

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'The Server did not respond, please try again later',  
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
    }, [id]) 

    const price = (num) => {

        let str = Math.round(num).toString()

        if(str.length <= 2) return ("0." + str)
        if(str.length > 2){
            return (str[0] + "." + str.slice(1,(str.length)))
        }
    }

    const handleClick = async () => {
        const recipe = {
            id: data.id,
            image: data.image,
            title: data.title,
            summary: data.sumary,
            vacio: false,
            time: data.readyInMinutes,
            score: data.spoonacularScore,
            price: data.pricePerServing
        }

        handleAdd(recipe)
        // console.log(data)
    }

    return (
        <>
            <Nav />
            <div className='p-3 row w-100 m-auto'>
                {
                    loader
                    ?   <Loader />
                    :   <>  
                            {/* image */}
                            <div className='col-12 col-sm-6 p-3'>
                                <img className='img-fluid rounded border w-100 h-100 d-block' src={data.image} alt={data.title} />
                            </div>

                            {/* titulo + acciones */}
                            <div className='col-12 col-sm-6 p-3 d-flex justify-content-between flex-column'>
                                <h1 className='h1 text-md-center mb-5'>{data.title}</h1>
                                <button onClick={handleClick} className='f-3 btn btn-primary w-100 p-3'>Add</button>
                            </div>

                            {/* info pricipal */}
                            <div className='px-3'>
                                <div className='row m-auto w-100'>
                                    {
                                        data.spoonacularScore
                                        ?   <div className='col-6 col-sm-4 col-lg  container-icon p-3'>
                                                <svg width={"2em"} className='icon rounded' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>
                                                <span className='title'>Spoonacular score: {data.spoonacularScore}%</span>
                                            </div>
                                        :   null   
                                    }
                                    {
                                        data.pricePerServing
                                        ?   <div className='col-6 col-sm-4 col-lg  container-icon p-3'>
                                                <svg width={"2em"} className='icon rounded' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 512"><path d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z"/></svg>
                                                <span className='title'>${price(data.pricePerServing)} per serving</span>
                                            </div>
                                        :   null   
                                    }
                                    {
                                        data.aggregateLikes
                                        ?   <div className='col-6 col-sm-4 col-lg  container-icon p-3'>
                                                <svg width={"2em"} className='icon rounded' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"/></svg>
                                                <span className='title'>{data.aggregateLikes} likes</span>
                                            </div>
                                        :   null   
                                    }
                                    {
                                        data.readyInMinutes
                                        ?   <div className='col-6 col-sm-4 col-lg  container-icon p-3'>
                                                <svg width={"2em"} className='icon rounded' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"/></svg>
                                                <span className='title'>Ready in {data.readyInMinutes} minutes</span>
                                            </div>
                                        :   null   
                                    }
                                    {
                                        data.healthScore
                                        ?   <div className='col-6 col-sm-4 col-lg  container-icon p-3'>
                                                <svg width={"2em"} className='icon rounded' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"/></svg>
                                                <span className='title'>Health score: {data.healthScore}</span>
                                            </div>
                                        :   null   
                                    }
                                </div>
                            </div>

                            {/* descripcion */}
                            <div className='p-3'>
                                <Description code={data.summary || "no data"} />
                            </div>

                            {/* Ingredients */}
                            <div className='ingredients rounded-top p-3'>
                                <div className='line'></div>
                                <h2 className='p-3 px-5'>Ingredients</h2>
                                {
                                    data.extendedIngredients
                                    ?   data.extendedIngredients.map((ele,i) => <p key={`ingredient-${i}`} className='steps text-secondary p-1 px-5'>{ele.original}</p>)
                                    :   null
                                }
                            </div>

                            {/* Instructions */}
                            <div className='instructions rounded-bottom p-3'>
                                <div className='line'></div>
                                <h2 className='p-3 px-5'>Instructions</h2>
                                {
                                    data.analyzedInstructions
                                    ?   data.analyzedInstructions[0]["steps"].map((ele,i) => <p key={`step-${i}`} className='steps text-secondary p-1 px-5'>{ele.step}</p>)
                                    :   null
                                }
                            </div>

                            {/* Extras */}
                            <div className='extra p-3 flex-wrap'>
                                <div className='row'>
                                    {
                                        <div className='item col-6 col-sm-4 col-lg-3 p-3'>
                                            <span>Cheap: </span>
                                            {
                                                data.cheap 
                                                ? <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
                                                : <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
                                            }
                                        </div> 
                                    }  
                                    {
                                        <div className='item col-6 col-sm-4 col-lg-3 p-3'>
                                            <span>Dairy free: </span>
                                            {
                                                data.dairyFree
                                                ? <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
                                                : <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
                                            }
                                        </div> 
                                    }  
                                    {
                                        <div className='item col-6 col-sm-4 col-lg-3 p-3'>
                                            <span>Fluten free: </span>
                                            {
                                                data.dairyFree
                                                ? <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
                                                : <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
                                            }
                                        </div> 
                                    }  
                                    {
                                        <div className='item col-6 col-sm-4 col-lg-3 p-3'>
                                            <span>Low fod Map: </span>
                                            {
                                                data.lowFodmap
                                                ? <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
                                                : <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
                                            }
                                        </div> 
                                    } 
                                    {
                                        <div className='item col-6 col-sm-4 col-lg-3 p-3'>
                                            <span>Sustainable: </span>
                                            {
                                                data.sustainable
                                                ? <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
                                                : <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
                                            }
                                        </div> 
                                    }  
                                    {
                                        <div className='item col-6 col-sm-4 col-lg-3 p-3'>
                                            <span>Vegan: </span>
                                            {
                                                data.vegan
                                                ? <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
                                                : <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
                                            }
                                        </div> 
                                    } 
                                    {
                                        <div className='item col-6 col-sm-4 col-lg-3 p-3'>
                                            <span>Vegetarian: </span>
                                            {
                                                data.vegetarian
                                                ? <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
                                                : <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
                                            }
                                        </div> 
                                    }  
                                    {
                                        <div className='item col-6 col-sm-4 col-lg-3 p-3'>
                                            <span>Very healthy: </span>
                                            {
                                                data.veryHealthy
                                                ? <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
                                                : <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
                                            }
                                        </div> 
                                    }  
                                    {
                                        <div className='item col-6 col-sm-4 col-lg-3 p-3'>
                                            <span>Very popular: </span>
                                            {
                                                data.veryPopular
                                                ? <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
                                                : <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
                                            }
                                        </div> 
                                    }  
                                </div>
                            </div>

                            {/* diets */}
                            {
                                data.diets 
                                ?   <div className='diets row w-100 m-auto flex-wrap gap-1'>
                                        <h2 className='py-3 col-12'>Diets</h2>
                                        {   
                                            data.diets.length === 0 
                                            ?   <p className='item rounded text-center col text-secondary p-3'>no data</p>
                                            :    data.diets.map((ele,i) => <p key={`diets-${i}`} className='item rounded text-center col text-secondary p-3'>{ele}</p>)
                                        }
                                    </div>
                                : null
                            }

                            {/* dish types */}
                            {
                                data.dishTypes
                                ?   <div className='types row w-100 m-auto flex-wrap gap-1'>
                                        <h2 className='p-3'>Dish Types</h2>
                                        { 
                                            data.dishTypes.length === 0 
                                            ?   <p className='item rounded text-center col text-secondary p-3'>no data</p>
                                            :   data.dishTypes.map((ele,i) => <p key={`dish-types-${i}`} className='item rounded text-center col text-secondary p-3'>{ele}</p>)
                                        }
                                    </div>
                                : null
                            }

                            {/* footer */}
                            <footer className='footer p-3 text-center border-top mt-5'>
                                {
                                    data.creditsText
                                    ?   <h3 className='h3 col-12 pb-3'>{data.creditsText}</h3>
                                    :   null
                                }
                                {
                                    data.sourceUrl 
                                    ?   <a className='a p-3 px-5 mb-3 btn btn-outline-primary me-2' href={data.sourceUrl}>{data.sourceName || "website"}</a>
                                    :   null
                                }
                                {
                                    data.spoonacularSourceUrl
                                    ?   <a className='a p-3 px-5 mb-3 btn btn-outline-primary ' href={data.spoonacularSourceUrl}>Spoonacular</a>
                                    :   null
                                }
                            </footer>
                        </>
                }
            </div>
        </>
    )
}

export default Details