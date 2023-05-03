import React, { useEffect, useState } from 'react'
// import footballer from './../../assets/landing-page/footballer.png'
import footballer from './../../../assets/landing-page/footballer.png'
import shape from './../../../assets/landing-page/shape.png'
import bcg from './../../../assets/landing-page/bcg.jpg'
import './landingTop.scss'
import { Link } from 'react-router-dom'

const LandingTop = () => {
    return (
        <div className="landing-page-container">
            <img
                className="landing-page-bcg"
                src={bcg}
                alt="shape"
            />
            <div className="text-area">
                <h2 className="text-area__header">
                    Wirtualna rozrywka w obstawianie meczy
                </h2>
                <Link className="linkToRegister" to={'/register'}>
                    Zarejestruj się i graj
                </Link>
            </div>
            <div className="image-area">
                <div className="image-area__background">
                    <img
                        className="image-area__background--img"
                        src={footballer}
                        alt="fotballer photo"
                    />
                </div>
            </div>
        </div>
    )
}

export default LandingTop
