import React,{useEffect} from 'react'
import {useDispatch} from 'react-redux';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from "./store";
import {relode} from './Actions/Actions'

import Navbarcomponent from './components/navbarcomponent'
import Homepage from './pages/homepage';
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
        <Homepage/>
      </Route>

      <Route exact path="/login" >
        <Loginpage/>
      </Route>

      <Route exact path="/register" >
        <Registerpage/>
      </Route>

      <Route exact path="/blog" >
        <BlogPage/>
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

      <Route exact path="*" >
        <ErrorPage/>
      </Route>
            
    </Switch>
  )
}

function App() {
  return (
    
    <Provider store={store}>
      <BrowserRouter>
      <Navbarcomponent/>
      <Routing />
    </BrowserRouter>
    </Provider>

  );
}

export default App;
