import React from 'react'
import "./Footer.css"
import logo from "../../assets/logo.png"

const Footer = () => {

    return (

        <div className='footer-container'>
            <p style={{ fontSize: "12px", textAlign: "center", marginTop: "2rem" }}>
                D.O.G.E - Department of Government Efficiency
                Certified Secure Transaction System</p>
            <img className='image' src={logo} alt="Logo" />
        </div>


    )
}

export default Footer;