import { TYPES } from "../actions/MenuActions"
const Swal = require('sweetalert2')

export const MenuInitialState = []

function MenuReducer (state,action) {
    switch(action.type){
        case TYPES.ADD_PLATE:{

            let vegeterian = state.filter(ele => ele.vegetarian)
            let nonVegeterian = state.filter(ele => !ele.vegetarian)
            let verification =  state.filter(ele => ele.id === action.payload.id)

            // si ya hay 2 recetas vegetarianas
            if(vegeterian.length >= 2 && action.payload.vegeterian){
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'There are already 2 vegetarian recipes saved.',
                    showConfirmButton: false,
                    timer: 1500,
                    background: "#232323",
                    color: "#fff"
                })
                return state
            }

            // si ya hay 2 recetas no vegetarianas
            if(nonVegeterian.length >= 2 && !action.payload.vegetarian){
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'There are already 2 non-vegetarian recipes saved.',
                    showConfirmButton: false,
                    timer: 1500,
                    background: "#232323",
                    color: "#fff"
                })
                return state
            }

            // si ya esta guardado la receta
            if (verification.length === 1){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'This recipe is already saved.',
                    background: "#232323",
                    color: "#fff"
                })
                return state
            }

            // comprueba la cantidad que hay guardados
            if(state.length < 4){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your recipe has been saved.',
                    showConfirmButton: false,
                    timer: 1000,
                    background: "#232323",
                    color: "#fff"
                })
                localStorage.setItem("data",JSON.stringify([
                        ...state,
                        action.payload
                    ]))
                return [
                    ...state, 
                    action.payload
                ]
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You can only add a maximum of 4 recipes.',
                    background: "#232323",
                    color: "#fff"
                })
                return state
            }
        }

        case TYPES.DELETE_PLATE:
            let data = state.filter(ele => ele.id !== action.payload)
            localStorage.setItem("data",JSON.stringify(data))
            return data

        case TYPES.ORDER:
            let vegetarian = state.filter(ele => ele.vegetarian)
            if(state.length === 4 && vegetarian.length === 2){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your request has been sent.',
                    showConfirmButton: false,
                    background: "#232323",
                    color: "#fff"
                })
                localStorage.removeItem("data")
                return MenuInitialState
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'The recipes must be two vegetarian and two non-vegetarian.',
                    background: "#232323",
                    color: "#fff"
                })
                return state
            }

        case TYPES.RESET:
            localStorage.removeItem("data")
            return MenuInitialState

        case TYPES.GET_DATA:
            let getData = localStorage.getItem("data")
            if(getData){
                getData = JSON.parse(getData)
                return [...getData]
            }
            else return state

        default: return state
    }
}

export default MenuReducer