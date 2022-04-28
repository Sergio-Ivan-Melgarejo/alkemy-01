import { TYPES } from "../actions/MenuActions"
const Swal = require('sweetalert2')

export const MenuInitialState = []

function MenuReducer (state,action) {
    switch(action.type){
        case TYPES.ADD_PLATE:
            let verification =  state.filter(ele => ele.id === action.payload.id)
        
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

        case TYPES.DELETE_PLATE:
        return state.filter(ele => ele.id === action.payload)
        case TYPES.ORDER:

            let vegeterian = state.filter(ele => ele.veterian)

            if(state.length === 4 && vegeterian.length === 2){
                return
            }
            else{
                return state
            }
        case TYPES.RESET:
        return MenuInitialState
        default: return state
    }
}

export default MenuReducer