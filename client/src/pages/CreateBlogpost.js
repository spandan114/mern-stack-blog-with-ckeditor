import React,{useState,useEffect} from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import {createblog} from "../Actions/Actions"
import Spinner from '../components/Spinner';

const editorConfiguration = {
    // plugins: [CKFinder],
    // toolbar: [ 'ckfinder', 'indent'], 
    removePlugins: ['MediaEmbed','ImageUpload'],
  };


const CreateBlogpost = () => {

        const history = useHistory()
        const dispatch = useDispatch();
        const user = useSelector(state => state.authReducer.user)
        const [content, setContent] = useState("")
        const [title, setTitle] = useState("")
        const [filename, setFilename] = useState('Choose File');
        const [uploadedFile, setUploadedFile] = useState();
        const [message, setMessage] = useState();
        const [loader, setLoader] = useState(false);
        const [userid, setUserId] = useState();


        useEffect(() => {
               setUserId(user?user._id:"")
        }, [user])


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
                setMessage({success:"image successfully uploded"})
                }else{
                    setLoader(false)
                    setMessage({error:"please try again . somthing went wrong !!"})
                }
                
               console.log(data)
            })
            .catch(err=>{
                console.log(err)
            })
          }

        const onSubmit = (event) => {
            event.preventDefault();
            setContent("");
            if (user == null) {
                return alert('Please Log in first');
            }
            const variables = {
                title:title,
                image:uploadedFile,
                content: content,
                user: user,
            }

            dispatch(createblog(variables))
            setTimeout(() => {
                 history.push('/blog')
             }, 2000);
        }

        return(
        <div className="container mt-5">
        <h2>Create blog</h2>

        {messages()}

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
            data="<p>Write your blog post ...</p>"
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                setContent(data)
                console.log(data)
            } }
            config={ editorConfiguration }
        />

                <form onSubmit={onSubmit}>
                    <div style={{ textAlign: 'center', margin: '2rem', }}>
                        <button
                            type="submit"
                            className="btn btn-success"
                            onSubmit={onSubmit}
                        >
                            Submit
                    </button>
                    </div>
                </form>
            </div>
        </div>
        )
}

export default CreateBlogpost