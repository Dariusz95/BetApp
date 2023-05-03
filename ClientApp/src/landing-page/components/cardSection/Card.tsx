import React, { useEffect, useState } from 'react'
import { CardData } from './cardSectionData'

const Card: React.FC<CardData> = ({ title, content, image }) => (
    <div className="col-12 col-md-4">
        <div className="card">
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    </div>
)

export default Card
