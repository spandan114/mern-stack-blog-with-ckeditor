import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import { getAllblogs,Deleteblogs } from '../Actions/Actions'
import {Link } from 'react-router-dom'
import Spinner from '../components/Spinner'

function BlogPage() {

    const dispatch = useDispatch();
    const blog = useSelector(state => state.BlogReducer.blog)
    const message = useSelector(state => state.BlogReducer.message)


    useEffect(() => {
        dispatch(getAllblogs())
    },[])

    const deletepost = (id) =>{
        dispatch(Deleteblogs(id))
    }

    const renderCards = blog?blog.map((blog, index) => {
        return(
            <div className="col-lg-4  col-md-6 col mb-4" key={index}>
             <div className=" card p-0 shadow"  >
                     <div className="card-header d-flex align-items-center m-0 p-0">
                     <img src={blog.writer.pic} className="ml-2" style={{ width:50,borderRadius:50 }} alt={blog.writer.pic} />
                      <div className=" pt-2 ml-2">
                        <p className="m-0 p-0"><strong>{blog.writer.name}</strong></p>
                        <p>{blog.createdAt}</p>
                      </div>
                    </div>

                    <div className="card-body" style={{ height: 170, overflowY: 'scroll'}}>
                        <h3> {blog.title}</h3>
                        <img style={{ width: '100%' }} src={`uploads/${blog.image}`} alt='' />
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>

                    <div className="card-footer d-flex justify-content-between"  >
                      <Link className="card-link" style={{color:'black'}} to={`/editblog/${blog._id}`} > <i className="fas fa-edit "/></Link>
                      <Link className="card-link" style={{color:'black'}} to={`/post/${blog._id}`}> <i className="fas fa-ellipsis-h "/></Link>
                      <Link className="card-link" style={{color:'black'}} to="#" onClick={()=>deletepost(blog._id)} > <i className="fas fa-trash "/></Link>
                    </div>
              </div>
              </div>
        )
    }):<Spinner/>


    const messages = () =>{
        return(
            <>{
            message?
            <div className={`alert alert-dismissible fade show ${message.success?"alert-success":"alert-danger"} `} role="alert">
                <strong>{message.success?message.success:message.error}</strong> 
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            :""
            }
            </>
        )}

          
        
        

    return (
        <div className="container mt-5">
             {messages()}
            <h1 > Blog Lists </h1>
            <div className="row row-cols-1 row-cols-md-2">
            {renderCards}
            </div>
        </div>
    )

}

export default BlogPage
