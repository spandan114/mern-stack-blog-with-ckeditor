import React from 'react'
import {Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div className="App">
            <div className="App-header">
                <h1 className="h1">404</h1>
                <Link className="btn btn-light" to="/">
                     BACK
                </Link>
            </div>
        </div>
    )
}

export default ErrorPage
