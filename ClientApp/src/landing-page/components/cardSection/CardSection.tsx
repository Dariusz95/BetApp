import React, { useEffect, useState } from 'react'
import Card from './Card'
import './Card.scss'
import { cardSectionData, CardData } from './cardSectionData'

const CardSection = () => (
    <div className="container">
        <div className="row">
            {cardSectionData.map((card: CardData) => (
                <Card
                    key={card.title}
                    title={card.title}
                    content={card.content}
                    image={card.image}
                />
            ))}
        </div>
    </div>
)

export default CardSection
