import React,{useState,useEffect} from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useHistory,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux';
import {updateBlogs,getblogbyId} from '../Actions/Actions'
import axios from 'axios';
const token = localStorage.getItem("jwt")

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

            setFilename(e.target.files[0].name)

            let imageFormObj = new FormData();
            imageFormObj.append("imageName", "multer-image-" + Date.now());
            imageFormObj.append("imageData", e.target.files[0]);

            axios.post(`/api/blog/uploadfiles`, imageFormObj,{ headers: {"Authorization" : `Bearer ${token}`} }).then(data => {
                console.log(data)
              if (data.data.success) {
                //   console.log(data.data.document)
                  setUploadedFile(data.data.document)
                alert("Image has been successfully uploaded using multer");
              }
            });
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
                content: content
            }
            dispatch(updateBlogs(id,variables))
            history.push('/blog')

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

        <img style={{ width: '100%' }} src={`/uploads/${uploadedFile}`} alt='' />

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

export default EditBlog
