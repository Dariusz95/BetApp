import React, { useEffect, useState } from 'react'
import LandingTop from './components/landingTop/landingTop'
import CardSection from './components/cardSection/CardSection'
import './landingPage.scss'

const LandingPage = () => {
    return (
        <div>
            <section>
                <LandingTop />
            </section>
            <section className="card-section">
                <CardSection />
            </section>
        </div>
    )
}

export default LandingPage
