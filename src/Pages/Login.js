import React, { useState } from 'react'
const axios = require('axios');

const Login = () => {
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [msgMail, setMsgMail] = useState([])
    const [msgPassword, setMsgPassword] = useState([])

    const handleSubmit = (e) =>{
        e.preventDefault()
        setMail(e.target.mail.value)
        setPassword(e.target.password.value)

        // Validaciones
        let error = false;
        if(!mail.includes("@")){ 
            setMsgMail([...msgMail,'El Mail debe tener "@"']);
            error= true;
        }
        if(!mail.includes(".com")){ 
            setMsgMail([...msgMail,'El Mail debe tener ".com"']);
            error= true;
            
        }
        console.log(e.target.mail.value)

        // alert(mail)
        // alert(mail.includes("@"))
        // alert(!mail.includes(".com"))

        //algo para si esta vacio


        if(!error){
            alert("paso")
            // Login
            axios.post('http://challenge-react.alkemy.org/',{   
                // email: "challenge@alkemy.org",
                // password: "react"    
                email: mail,
                password:password   
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    return (
        <div className='col border border-warning'> 
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input name="mail" autoComplete='email' type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
                    {/* {
                        msgMail.map((ele,i) => <div key={`msgPassword${i}`} className="form-text">{ele}</div>)
                    } */}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input name="password" autoComplete='current-password' type="password" className="form-control" id="password"/>
                    {
                        msgPassword.map((ele,i) => <div key={`msgPassword${i}`} className="form-text">{ele}</div>)
                    }
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login