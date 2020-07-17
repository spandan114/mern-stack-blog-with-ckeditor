import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {register} from '../Actions/Actions'
import {
    Container, Col, Alert,
    FormGroup, Label, Input,
    Button
  } from 'reactstrap';
  import {Link,useHistory} from 'react-router-dom'


export default function Registerpage() {

  const user = useSelector(state => state.authReducer.user)
  const dispatch = useDispatch();

    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [error,setError] = useState("")

    useEffect(() => {
      if(user !== null){
        history.push('/')
      }else{
        history.push('/register')
      }
    }, [user])

 
    const PostData = ()=>{
      if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        setError("invalid email")
        return
    }
        //Create new user
        const newUser = {
          name,
          email,
          password
        }
        dispatch(register(newUser))
        history.push('/login')
 }


    return (
        
        <Container className="App border p-3 shadow">
        <h2 className="text-center">Register</h2>
        {error?
        <Alert color="danger">
       {error}
      </Alert>
      :
      ""
      }
        

        <Col>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                id="exampleName"
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </FormGroup>
          </Col>

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
          {/* <Col>
            <FormGroup>
              <Label for="examplePassword">Conform Password</Label>
              <Input
                type="password"
                name="password2"
                id="examplePassword2"
                placeholder="********"
              />
            </FormGroup>
          </Col> */}
          <Button className="btn btn-block btn-info" onClick={()=>PostData()}>Register</Button>
        
        <p className="text-center pt-3">
                <Link to="/login">Already have an account ?</Link>
        </p>
        
      </Container>
    
    )
}
