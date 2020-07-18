import React,{useState} from 'react'
import ButterToast, { Cinnamon } from "butter-toast";
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
        const [loader, setLoader] = useState(false);
        const [btnloader,setbtnLoader] = useState(false)



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
                content: content,
                user: user,
            }

            const onSuccess = () => {
                ButterToast.raise({
                    content: <Cinnamon.Crisp title="Post Box"
                        content="Blog created successfully"
                        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    />
                })
                setbtnLoader(false)
                history.push('/')
            }

            const onError = () => {
                ButterToast.raise({
                    content: <Cinnamon.Crisp title="Post Box"
                        content="somthing went wronr ! . please try again"
                        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    />
                })
                setbtnLoader(false)
            }

            dispatch(createblog(variables,onSuccess,onError))
            // setTimeout(() => {
            //      history.push('/blog')
            //  }, 2000);
        }

        return(
        <div className="container mt-5">
        <h2>Create blog</h2>

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
                    {/* <div style={{ textAlign: 'center', margin: '2rem', }}>
                        <button
                            type="submit"
                            className="btn btn-success"
                            onSubmit={onSubmit}
                        >
                            Submit
                    </button>
                    </div> */}
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

export default CreateBlogpost