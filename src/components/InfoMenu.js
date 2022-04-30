import React from 'react'

const InfoMenu = ({state}) => {
    const handlePrice = () => {
        if(state.length <= 0) return "no data"
        let num = 0;
        for(let i=0; i<state.length; i++){
            num += (state[i].price * state[i].servings);
        }

        // let str = Math.round(num).toString()
        // if(str.length <= 2) return ("0." + str)
        // if(str.length > 2){
        //     return (str[0] + "." + str.slice(1,(str.length)))
        // }

        let str = Math.round(num).toString()
        if(str.length >= 3) return str.slice(0,-2) + "." + str.slice(-2,str.length)
        if(str.length === 2) return ("0." + str)
        if(str.length === 1) return ("0.0" + str)
        return "0.00"
    }

    const handlePricePerPortion = () => {
        if(state.length <= 0) return "no data"
        let num = 0;
        for(let i=0; i<state.length; i++){
            num += state[i].price;
        }

        num = num / state.length

        // let str = Math.round(num).toString()
        // if(str.length <= 2) return ("0." + str)
        // if(str.length > 2){
        //     return (str[0] + "." + str.slice(1,(str.length)))
        // }

        let str = Math.round(num).toString()
        if(str.length >= 3) return str.slice(0,-2) + "." + str.slice(-2,str.length)
        if(str.length === 2) return ("0." + str)
        if(str.length === 1) return ("0.0" + str)
        return "0.00"
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
            <h2 className='h3'>Info Menu</h2>
            <ul className="row p-0 text-center">
                <li className="col-12 col-sm-6 col-md-4 col-lg-3 list-group-item bg-dark text-light">
                    Price: <span className='text-primary'>{state.length > 0 ? "$" : null}{handlePrice()}</span> (total)
                </li>
                <li className="col-12 col-sm-6 col-md-4 col-lg-3 list-group-item bg-dark text-light">
                    Price per portion: <span className='text-primary'>{state.length > 0 ? "$" : null}{handlePricePerPortion()}</span> (average)
                </li>
                <li className="col-12 col-sm-6 col-md-4 col-lg-3 list-group-item bg-dark text-light">
                    Time: <span className='text-primary'>{handleTime()} minutes</span> (average)
                </li>
                <li className="col-12 col-sm-6 col-md-4 col-lg-3 list-group-item bg-dark text-light">
                    Healt Score: <span className='text-primary'>{handleScore()}</span> (average)
                </li>
            </ul>
        </section>
    )
}

export default InfoMenu