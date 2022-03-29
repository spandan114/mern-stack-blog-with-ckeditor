import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {register} from '../Actions/Actions'
import ButterToast, { Cinnamon } from "butter-toast";
import {
    Container, Col, 
    FormGroup, Label, Input,
    Button
  } from 'reactstrap';
  import {Link,useHistory} from 'react-router-dom'


export default function Registerpage() {

  const user = useSelector(state => state.authReducer.user)
  const message = useSelector(state => state.authReducer.message)
  const dispatch = useDispatch();

    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [loader,setLoader] = useState(false)

    useEffect(() => {
      if(user !== null){
        history.push('/')
      }else{
        history.push('/register')
      }
    }, [user])

 
    const PostData = ()=>{
    //   if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    //     setError("invalid email")
    //     return
    // }
        //Create new user

        setLoader(true)

        const newUser = {
          name,
          email,
          password
        }

        const onSuccess = () => {
          ButterToast.raise({
              content: <Cinnamon.Crisp title="Sucess"
                  content="User saved successfully . you can logein now"
                  scheme={Cinnamon.Crisp.SCHEME_PURPLE}
              />
          })
          setLoader(false)
          history.push('/login')
      }
      const onError = () => {
        // setTimeout(() => {
          ButterToast.raise({
            content: <Cinnamon.Crisp title="Error"
                content={message}
                scheme={Cinnamon.Crisp.SCHEME_RED}
            />
        })
        setLoader(false)
       
      // }, 3000);
      }

        dispatch(register(newUser,onSuccess,onError))
 }


    return (
        
        <Container className="App border p-3 shadow">
        <h2 className="text-center">Register</h2>
        

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

          {loader == false?<Button className="btn btn-block btn-info" onClick={()=>PostData()}>Register</Button>:
          <button className="btn btn-block btn-info" type="button" disabled>
               <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                 Loading...
           </button>
          }
 
        
        <p className="text-center pt-3">
                <Link to="/login">Already have an account ?</Link>
        </p>
        
      </Container>
    
    )
}
