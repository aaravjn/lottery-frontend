import '../css/Navbar.css'
import React, { useState } from "react"
import { ethers } from "ethers"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const navigation = {
    about: "/About"
}
function Navbar({username}) {

    const addressTextVariant = {
        color:"black",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width:"12em",
        backgroundColor:"rgb(176, 191, 191, 0.8)",
    }
    const buttonTextVariant = {
        backgroundColor:"rgba(0, 0, 0, 0.8)",
        color:"white",
        width:"10em"
    }

    const [buttonText, setButtonText] = useState("Connect")
    const [buttonState, setButtonState] = useState(1)

    async function connectOrDisconnect() {
        if(buttonState) {
            if(window.ethereum) {

                await window.ethereum.request({method:'eth_requestAccounts'})
                const temp_provider = new ethers.providers.Web3Provider(window.ethereum)
                const temp_signer = temp_provider.getSigner()
                const temp_address = await temp_signer.getAddress()
            
                setButtonText(temp_address)
                setButtonState(0)
            }
            else {
                toast.info("Please install the metamask extension", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            }
        }
        else {
            setButtonState(1)
            setButtonText("Connect")
        }
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <span className="navbar-brand" href="/">DELOTT</span>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">HOME</a>
                        </li>
                        <li className="nav-item">
                            <Link to={navigation.about} className="nav-link" href='/'>ABOUT</Link>
                        </li>
                    </ul>
                </div>
                <motion.button
                    className='btn'
                    whileHover={{
                        boxShadow: "-1px 1px 5px -1px black",
                        y: -3
                    }}
                    style={ buttonState ? buttonTextVariant : addressTextVariant }
                    onClick={connectOrDisconnect}
                >
                    <span 
                        className='rounded-circle'
                        style={{
                            display: buttonState ? "none" : "inline",
                            marginRight:"7px",
                            width:"22px",
                            height:"22px",
                            position:"relative",
                            top:"4px"
                        }}
                    >
                        <Jazzicon diameter={19} seed={jsNumberForAddress(buttonText)} />
                    </span>
                    {buttonText}
                    <span className="badge"
                        style={{
                            marginLeft:"0.5em",
                            backgroundColor:"rgb(71,83,232)"
                        }}
                    >GOERLI</span>
                </motion.button>
            </div>
        </nav>
    )
}
export default Navbar;