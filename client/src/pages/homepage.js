import React from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

export default function Homepage() {

    const history = useHistory()
    
    const user = useSelector(state => state.authReducer.user)
    if(user == null){
        history.push("/login")
    }

    return (
        <div className="container  mt-5 text-center">
           <h1>Name :- {user?user.name : "loading" } </h1>
           <h1>Email :- {user?user.email : "loading" } </h1>       
        </div>
    )
}
