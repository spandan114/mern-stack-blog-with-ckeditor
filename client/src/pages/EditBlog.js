import React,{useState,useEffect} from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useHistory,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux';
import {updateBlogs,getblogbyId} from '../Actions/Actions'
import ButterToast, { Cinnamon } from "butter-toast";
import Spinner from '../components/Spinner';

const editorConfiguration = {
    // plugins: [ Indent],
    // toolbar: [ 'outdent', 'indent'],
    removePlugins: [ 'ImageUpload','MediaEmbed'],
  };


const EditBlog = () => {

        const history = useHistory()
        const {id} = useParams()
        const dispatch = useDispatch();
        const blog = useSelector(state => state.BlogReducer.blog)
        const user = useSelector(state => state.authReducer.user)
        const [content, setContent] = useState()
        const [title, setTitle] = useState()
        const [filename, setFilename] = useState('Choose File');
        const [uploadedFile, setUploadedFile] = useState({});
        const [loader, setLoader] = useState(false);
        const [btnloader,setbtnLoader] = useState(false)


        useEffect(() => {
            if(blog !== null){
                    setUploadedFile(blog[0].image)
                    setTitle(blog[0].title)
                    setContent(blog[0].content)
            }
            dispatch(getblogbyId(id))
        }, [blog && id])



            const Upload =(e) => {
                e.preventDefault();
    
                setLoader(true)
                setFilename(e.target.files[0].name)
                const data = new FormData()
                data.append("file",e.target.files[0])
                data.append("upload_preset","insta-clone")
                data.append("cloud_name","cnq")
    
                fetch("https://api.cloudinary.com/v1_1/joshi/image/upload",{
                    method:"post",
                    body:data
                })
                .then(res=>res.json())
                .then(data=>{
                    if(data.url)
                    {setLoader(false)
                    setUploadedFile(data.url)
                    ButterToast.raise({
                        content: <Cinnamon.Crisp scheme={Cinnamon.Crisp.SCHEME_BLUE}
                         content={() => <div>success</div>}
                         title="ButterToast example"/>
                    })
    
    
                    }else{
                        setLoader(false)
                                ButterToast.raise({
                                 content: <Cinnamon.Crisp scheme={Cinnamon.Crisp.SCHEME_RED}
                                  content={() => <div>error</div>}
                                  title="ButterToast example"/>
                             })
                    }
                    
                   console.log(data)
                })
                .catch(err=>{
                    console.log(err)
                })
              }

        const onSubmit = (event) => {
            event.preventDefault();

            setbtnLoader(true)
            setContent("");
            if (user == null) {
                return alert('Please Log in first');
            }
            const variables = {
                title:title,
                image:uploadedFile,
                content: content
            }

            const onSuccess = () => {
                ButterToast.raise({
                    content: <Cinnamon.Crisp title="Post Box"
                        content="Blog updated successfully"
                        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    />
                })
                setbtnLoader(false)
            }

            const onError = () => {
                ButterToast.raise({
                    content: <Cinnamon.Crisp title="Post Box"
                        content="somthing went wronr !"
                        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    />
                })
                setbtnLoader(false)
            }

            dispatch(updateBlogs(id,variables,onSuccess,onError))
            history.push('/')

        }

        return(
        <div className="container mt-5">
        <h2>Edit Bloog</h2>
        <div>

        <div className="input-group mb-3">
        <form>
            <div className="custom-file">
                <input type="file" 
                className="custom-file-input"
                 onChange={Upload } />
                <label className="custom-file-label">{filename}</label>
            </div>
            </form>
        </div>

        {loader == true?<Spinner/>:<img style={{ width: '100%' }} src={uploadedFile} alt='' />}

        <div className="form-group">
            <label>Blog Title</label>
            <input type="text" 
            className="form-control"
             placeholder="Blog title"                 
             value={title}
             onChange={(e)=>setTitle(e.target.value)} />
        </div>


        <CKEditor
            editor={ ClassicEditor }
            data={blog?blog[0].content:"loading..."}
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                setContent(data)
            } }
            config={ editorConfiguration }
        />

                <form onSubmit={onSubmit}>
                    {btnloader == false?<button className="btn btn-block m-3 btn-info" onSubmit={onSubmit}>Submit</button>:
                       <button className="btn btn-block btn-info m-3" type="button" disabled>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                           Loading...
                       </button>
                    }
                </form>

            </div>
        </div>
        )
}

export default EditBlog
