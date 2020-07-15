import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {login} from '../Actions/Actions'
import {
    Container, Col,Alert,
    FormGroup, Label, Input,
    Button
  } from 'reactstrap';
  import {Link,useHistory} from 'react-router-dom'

export default function Loginpage() {

    const user = useSelector(state => state.authReducer.user)
    const dispatch = useDispatch();

    const history = useHistory()
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [error,setError] = useState("")
    
    useEffect(() => {
      if(user !== null){
        history.push('/')
      }
    }, [user])


      const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
          setError("invalid email")
            return
        }
        const new_contact = {
          email:email,
          password:password
      }

        dispatch(login(new_contact))
        history.push('/')

      }
        
      return (
        <Container className="App border p-3 mt-5 shadow ">
            
        <h2 className="text-center">Sign In</h2>

        {error?
        <Alert color="danger">
       {error}
      </Alert>
      :
      ""
      }

          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              {/* <span className="text-danger" >Email is required.</span> */}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                value={password}
                onChange={(e)=>setPasword(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Button className="btn btn-block btn-info" onClick={()=>PostData()}>Login</Button>

          <Link className="text-danget" to="/Forhotpassword">Forhotpassword</Link>
        
      </Container>

    )
}
