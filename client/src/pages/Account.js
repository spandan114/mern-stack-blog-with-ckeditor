import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {getmyblogs,Deleteblogs} from "../Actions/Actions"
import {Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import ButterToast, { Cinnamon} from 'butter-toast';

export default function Account() {

    const history = useHistory()
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user)
    const myblog = useSelector(state => state.BlogReducer.myblog)


    useEffect(() => {
        dispatch(getmyblogs(user?user._id:""))
        if(user == null){
            history.push("/login")
        }
    }, [user])


    const deletepost = id => {
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Post Box"
                    content="Deleted successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                />
            })
        }
        if (window.confirm('Are you sure to delete this record?'))
           dispatch(Deleteblogs(id,onSuccess))
    }

    const renderCards = myblog?myblog.map((blog, index) => {
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
                        <img style={{ width: '100%' }} src={blog.image} alt='' />
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
     

    return (
        <div className="container  mt-5">

        <div className="d-flex ">
            <div>
              {/* <img src={blog.writer.pic} className="ml-2" style={{ width:50,borderRadius:50 }} alt={blog.writer.pic} /> */}
            </div>
            <div>
               <p> {user?user.name : "loading" } </p>
               <p> {user?user.email : "loading" } </p> 
            </div>
        </div>

        <h2>Your Blog's</h2>

           <div className="row row-cols-1 mt-4 row-cols-md-2">
            {renderCards}
            </div>      
        </div>
    )
}
