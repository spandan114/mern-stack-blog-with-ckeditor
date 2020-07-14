import React,{useState} from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useSelector } from "react-redux";
import {useHistory} from 'react-router-dom'



const editorConfiguration = {
    // plugins: [ Indent],
    // toolbar: [ 'outdent', 'indent'],
    removePlugins: [ 'ImageUpload','MediaEmbed'],
  };


const CreateBlogpost = () => {

        const history = useHistory()
        const user = useSelector(state => state.authReducer.user)
        const [content, setContent] = useState("")


        const onSubmit = (event) => {
            event.preventDefault();

            setContent("");

            if (user == null) {
                return alert('Please Log in first');
            }

            const variables = {
                content: content,
                userID: user._id
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
        )
}

export default CreateBlogpost
