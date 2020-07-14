import React from 'react'
import {useSelector} from 'react-redux'

export default function Homepage() {

    
    const user = useSelector(state => state.authReducer.user)
    return (
        <div className="container  mt-5 text-center">
           <h1>Name :- {user?user.name : "loading" } </h1>
           <h1>Email :- {user?user.email : "loading" } </h1>       
        </div>
    )
}
