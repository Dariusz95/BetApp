import React, { useEffect, useState } from 'react'
import image from './../../../../assets/landing-page/image.png'
import './landingTop.scss'
import { Link } from 'react-router-dom'

const LandingTop = () => {
  return (
    <div className='landing-page-container'>
      <div className='text-container'>
        <h2 className='text-container__header'>Wirtualna rozrywka w obstawianie meczy</h2>
        <p className='text-container__description'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia praesentium alias in
          provident doloremque ipsam placeat, facilis officia minus tempore voluptatibus doloribus
          eum voluptatum, modi maiores corrupti deserunt qui sunt?
        </p>
        <Link className='text-container__button' to={'/register'}>
          Zarejestruj się i graj
        </Link>
      </div>
      <div className='image-container'>
        <img className='image-container__background' src={image} alt='fotballer photo' />
      </div>
    </div>
  )
}

export default LandingTop
