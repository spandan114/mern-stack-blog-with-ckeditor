import React,{useEffect} from 'react'
import {useDispatch} from 'react-redux';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from "./store";
import {relode} from './Actions/Actions'
import ButterToast,{ POS_RIGHT,POS_TOP } from "butter-toast";
import Navbarcomponent from './components/navbarcomponent'
import Account from './pages/Account';
import Loginpage from './pages/loginpage';
import Registerpage from './pages/registerpage';
import BlogPage from './pages/BlogPage';
import CreateBlogpost from './pages/CreateBlogpost';
import { PostPage } from './pages/PostPage';
import EditBlog from './pages/EditBlog';
import ErrorPage from './pages/404';


const Routing = ()=>{
  const dispatch = useDispatch();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch(relode(user))
    }
  },[])


    return(
  
      <Switch>
        <Route exact path="/" >
          <BlogPage/>
        </Route>

        <Route exact path="/account" >
          <Account/>
        </Route>
  
        <Route exact path="/create" >
          <CreateBlogpost/>
        </Route>
  
        <Route exact path="/post/:id" >
          <PostPage/>
        </Route>
  
        <Route exact path="/editblog/:id" >
          <EditBlog/>
        </Route>

        <Route exact path="/login" >
        <Loginpage/>
      </Route>

     <Route exact path="/register" >
       <Registerpage/>
     </Route>
  
        <Route exact path="*" >
          <ErrorPage/>
        </Route>
    </Switch>
    )
  }


function App() {
  return (
    
    <Provider store={store}>
      <BrowserRouter >
      <Navbarcomponent/>
      <ButterToast position={{vertical:POS_TOP,horizontal:POS_RIGHT}}/>
        <Routing />
    </BrowserRouter>
    </Provider>

  );
}

export default App;
