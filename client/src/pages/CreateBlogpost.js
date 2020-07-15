import React,{useState,useEffect} from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useSelector } from "react-redux";
import {useHistory} from 'react-router-dom'


const editorConfiguration = {
    // plugins: [CKFinder],
    // toolbar: [ 'ckfinder', 'indent'], 
    removePlugins: ['MediaEmbed','ImageUpload'],
  };


const CreateBlogpost = () => {

        const history = useHistory()
        const user = useSelector(state => state.authReducer.user)
        const [content, setContent] = useState("")
        const [title, setTitle] = useState("")
        const [file, setFile] = useState()
        const [filename, setFilename] = useState('Choose File');
        const [uploadedFile, setUploadedFile] = useState({});


        const Upload =(e) => {
            e.preventDefault();

            setFile(e.target.files[0])
            setFilename(e.target.files[0].name)

            let imageFormObj = new FormData();
            imageFormObj.append("imageName", "multer-image-" + Date.now());
            imageFormObj.append("imageData", file);

            axios.post(`/api/blog/uploadfiles`, imageFormObj).then(data => {
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
                content: content,
                userID: user._id,
            }

            axios.post('/api/blog/createPost', variables)
                .then(response => {
                    if (response) {
                        console.log('Post Created!');

                        setTimeout(() => {
                            history.push('/blog')
                        }, 2000);
                    }
                })
        }

        return(
        <div className="container mt-5">
        <h2>Create blog</h2>

        <div>
{/* (e)=>setFileName(e.target.files[0].name) */}
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

        <img style={{ width: '100%' }} src={`uploads/${uploadedFile}`} alt='' />

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
