import React from 'react'
import {Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div className="App text-dark text-center">
            {/* <div className="App-header"> */}
                <h1 className="h1">404</h1>
                <Link className="btn btn-dark " to="/">
                     BACK
                </Link>
            {/* </div> */}
        </div>
    )
}

export default ErrorPage
