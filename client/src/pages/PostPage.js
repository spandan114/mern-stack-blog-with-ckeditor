import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {getblogbyId} from '../Actions/Actions'
import {useParams} from 'react-router-dom'
// import {Link } from 'react-router-dom'
import Spinner from '../components/Spinner'

export const PostPage = () => {

    const {id} = useParams()
    const dispatch = useDispatch();
    const bloag = useSelector(state => state.BlogReducer.blog)

    useEffect(() => {
        dispatch(getblogbyId(id))
    }, [id])


        if(bloag){
            return (

        <div className="container mt-5" >
        <div className="row">
            <div className="col-md-8" >
              <h2 className="text-secondary text-uppercase">Blog content</h2>
                <div className=" p-3">

                    <div className="border p-2 rounded-pill" style={{ display: 'flex', justifyContent: 'space-between', }}>
                        <div className="d-flex" >
                         <img src={bloag[0].writer.pic}  style={{ width:50,borderRadius:50 }} alt="nnn" />
                         <p className="ml-3" style={{margin: "auto"}}> <strong>{bloag[0].writer.name} `s Post</strong></p>
                        </div>
                        <p  style={{margin: "auto"}}>{bloag[0].createdAt}</p>
                    </div>

                    <div className="content p-3 mt-3" style={{border: '1.5px solid #dfe6e9',borderRadius: '62px 0px 62px 0px',wordWrap:'break-word '}}>
                        <h1 className="text-dark mb-2">{bloag[0].title}</h1>
                        <img style={{ width: '100%',height:'100%',objectFit:"cover"}} src={bloag[0].image} alt='' className="mx-auto"  />
                        <div className="mt-3 text-dark " dangerouslySetInnerHTML={{ __html: bloag[0].content }} />
                    </div>

                </div>
            </div>
            <div className="col-md-4 p-3">
                <h3 className="text-secondary text-uppercase">Recent Posts</h3>
                <h4 className="text-secondary text-uppercase">tag's</h4>
            </div>
        </div>
        </div>
           ) 
        }else{
            return (
                <div className="container mt-5" >
                    <Spinner/>
                </div>
            )
        }
    
}
