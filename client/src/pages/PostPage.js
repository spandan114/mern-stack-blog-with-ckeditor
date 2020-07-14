import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {getblogbyId} from '../Actions/Actions'
import {useParams} from 'react-router-dom'
import {Link } from 'react-router-dom'
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>{bloag[0].writer.name}`s Post</p>
            <p >{bloag[0].createdAt}</p>
        </div>
          <div dangerouslySetInnerHTML={{ __html: bloag[0].content }} />
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
