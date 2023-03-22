import React, { useState } from "react"
import "../css/form.css"
import PropTypes from "prop-types"

async function loginUser(credentials) {
    const userCredentials = JSON.stringify(credentials)
    return fetch("https://token-api.onrender.com/", {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: userCredentials
    })
    .then(data => data.json())
}

function Login({ setToken }) {

    const [username, setUserName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [address, setAddress] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username,
            email,
            password,
            address
        }
        const token = 'test-1234'/*await loginUser(user)*/
        setToken(token, user)
    }

    return (
        <div className="wrapper">
            <h1 className="register">Please Register</h1>
            <form onSubmit={handleSubmit}>
                <label className="form-label">
                    UserName *
                    <input type="text" className="form-control" name="name" placeholder="Username" onChange={(e) => setUserName(e.target.value)} required />
                </label>
                
                <label className="form-label">
                    Your Email Id *
                    <input type="email" name="Email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                </label>

                <label className="form-label">
                    Password *
                    <input type="password" placeholder="Password" className="form-control" onChange={(e) => setPassword(e.target.value)} required />
                </label>

                <label className="form-label">
                    Metamask Account Address *
                    <input type="text" placeholder="Account address" className="form-control" onChange={(e) => setAddress(e.target.value)} required />
                </label>

                <div>
                    <button type="submit" className="submit-button btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
        
    )
}
export default Login;


Login.propTypes = {
    setToken: PropTypes.func.isRequired
}