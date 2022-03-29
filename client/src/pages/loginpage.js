import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import ButterToast, { Cinnamon } from "butter-toast";
import {login} from '../Actions/Actions'
import {
    Container, Col,
    FormGroup, Label, Input,
    Button,Form
  } from 'reactstrap';
  import {Link,useHistory} from 'react-router-dom'

export default function Loginpage() {

    const user = useSelector(state => state.authReducer.user)
    const message = useSelector(state => state.authReducer.message)

    const dispatch = useDispatch();

    const history = useHistory()
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [loader,setLoader] = useState(false)

    useEffect(() => {
      if(user !== null){
        history.push('/')
      }
    }, [user])


      const PostData = ()=>{

        setLoader(true)

        const new_contact = {
          email:email,
          password:password
      }

      console.log(message)

      const onSuccess = () => {
        ButterToast.raise({
            content: <Cinnamon.Crisp title="Sucess"
                content="successfully logedin"
                scheme={Cinnamon.Crisp.SCHEME_PURPLE}
            />
        })
        setLoader(false)
        history.push('/')
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

  dispatch(login(new_contact,onSuccess,onError))
      }

      return (
        <Container className="App border p-3 shadow ">

        <h2 className="text-center">Sign In</h2>


      <Form>
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
                required
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
                required
              />
            </FormGroup>
          </Col>
          {loader == false?<Button className="btn btn-block btn-info" onClick={()=>PostData()}>Login</Button>:
          <button className="btn btn-block btn-info" type="button" disabled>
               <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                 Loading...
           </button>
          }
        </Form>
          <Link className="text-danger" to="/register">Dont have an account ?</Link>

      </Container>

    )
}