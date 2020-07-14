import React,{useState,useEffect} from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useHistory,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux';
import {updateBlogs,getblogbyId} from '../Actions/Actions'

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

        useEffect(() => {
            dispatch(getblogbyId(id))
        }, [id])

        const onSubmit = (event) => {
            event.preventDefault();
            setContent("");
            if (user == null) {
                return alert('Please Log in first');
            }
            const variables = {
                content: content
            }
            dispatch(updateBlogs(id,variables))
            history.push('/blog')

        }

        return(
        <div className="container mt-5">
        <h2>Using CKEditor 5 build in React</h2>
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
        )
}

export default EditBlog
