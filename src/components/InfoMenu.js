import React from 'react'

const InfoMenu = ({state}) => {
    const handlePrice = () => {
        if(state.length <= 0) return "no data"
        let num = 0;
        for(let i=0; i<state.length; i++){
            console.log(state[i].price , state[i].servings)
            num += (state[i].price * state[i].servings);
        }
console.log(num)

        let str = Math.round(num).toString()
        if(str.length <= 2) return ("0." + str)
        if(str.length > 2){
            return (str[0] + "." + str.slice(1,(str.length)))
        }
    }

    const handlePricePerPortion = () => {
        if(state.length <= 0) return "no data"
        let num = 0;
        for(let i=0; i<state.length; i++){
            num += state[i].price;
        }

        num = num / state.length

        let str = Math.round(num).toString()
        if(str.length <= 2) return ("0." + str)
        if(str.length > 2){
            return (str[0] + "." + str.slice(1,(str.length)))
        }
    }

    const handleTime = () => {
        if(state.length <= 0) return "no data"

        let num = 0;
        for(let i=0; i<state.length; i++){
            num += state[i].time;
        }
        num = num / state.length
        let str = Math.round(num).toString()
        return str
    }

    const handleScore = () => {
        if(state.length <= 0) return "no data"

        let num = 0;
        for(let i=0; i<state.length; i++){
            num += state[i].score;
        }
        num = num / state.length
        let str = Math.round(num).toString()
        return str
    }
    return (
        <section className='p-1 w-100 m-auto pb-5'>
            <h2 className='h3'>Info Menu (average)</h2>
            <ul className="row p-0 text-center">
                <li className="col-12 col-sm-6 col-md-4 list-group-item bg-dark text-light">
                    Price: <span className='text-primary'>{state.length > 0 ? "$" : null}{handlePrice()}</span>
                </li>
                <li className="col-12 col-sm-6 col-md-4 list-group-item bg-dark text-light">
                    Price per portion: <span className='text-primary'>{state.length > 0 ? "$" : null}{handlePricePerPortion()}</span>
                </li>
                <li className="col-12 col-sm-6 col-md-4 list-group-item bg-dark text-light">
                    Time: <span className='text-primary'>{handleTime()}</span>
                </li>
                <li className="col-12 col-sm-6 col-md-4 list-group-item bg-dark text-light">
                    Healt Score: <span className='text-primary'>{handleScore()}</span>
                </li>
            </ul>
        </section>
    )
}

export default InfoMenu