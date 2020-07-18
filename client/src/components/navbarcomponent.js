import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link ,useHistory} from 'react-router-dom'
import {logout} from '../Actions/Actions'


export default function Navbarcomponent() {

  const user = useSelector(state => state.authReducer.user)
  const dispatch = useDispatch();
  const history = useHistory()


  const renderList = ()=>{
    if(user == null){
        return [
          <li className="nav-item active" key={3}>
          <Link className="nav-link font-weight-bolder" to="/register"
            >Register</Link>
        </li>,
        <li className="nav-item active" key={4}>
          <Link className="nav-link font-weight-bolder" to="/login"
            >Login</Link>
        </li>
        ]
    }else if(user != null){
      return [
              <li className="nav-item " key={3}>
              <Link className="nav-link text-white font-weight-bold" to="/create"
                >create </Link>
            </li>,
                  <li className="nav-item " key={2}>
                  <Link className="nav-link text-white font-weight-bold" to="/account"
                    >Account </Link>
                </li>,
      <li className="nav-item active" key={4}>
      <Link className="nav-link font-weight-bolder" to="" 
      onClick={()=>{
        localStorage.clear()
        dispatch(logout())
        history.push('/login')
        window.location.reload()
      }}
      >Logout</Link>
      </li>
      ]
    }
  }



    return (

        <div className="container-fluid pb-5">
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-sm-start  fixed-top"
      >
        <Link className="navbar-brand order-1 font-weight-bold order-lg-0 ml-3" to="/">BLOG </Link>

  
        {/* --mr-3 for left sidebar-- */}
        <button className="navbar-toggler align-self-start" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse bg-dark d-flex flex-column justify-content-lg-end flex-xl-row p-3 p-lg-0 mt-5 mt-lg-0 mobilemenu"
        id="navbarSupportedContent">
          {/* --add on-right class--  */}
          <ul className="navbar-nav navbar-left ml-auto ml-sm-0 ">
         <li className="nav-item " key={1}>
           <Link className="nav-link text-white font-weight-bold" to="/">Blog </Link>
         </li>
          {renderList()}


          </ul> 
        </div>
      </nav>
      <div className="overlay"></div>
      </div>

    )
}
