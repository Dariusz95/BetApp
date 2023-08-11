import React, { useEffect, useState } from 'react'

const Home = (props: { isAuthenticated: boolean }) => {
    return <div>{props.isAuthenticated ? 'You are logged in' : 'You are not logged in'}</div>
}

export default Home
