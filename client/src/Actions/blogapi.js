import axios from "axios";
const token = localStorage.getItem("jwt")

export default {
    Blog(url = '/api/blog/') {
        return {
            getAllblogs: () => axios.get(url+'getBlogs'),
            deleteBlog: id => axios.delete(url+`deletePost/${id}`,{ headers: {"Authorization" : `Bearer ${token}`} }),
            updateBlog: (id,newData) => axios.put(url+`updatePost/${id}`,newData,{ headers: {"Authorization" : `Bearer ${token}`} }),
            getBlogbyId: (id) => axios.post(url+`getPost/${id}`),
            creaeBlog: (newData) => axios.post(url+`createPost`,newData,{ headers: {"Authorization" : `Bearer ${token}`} }),
            uploadImage: (newImg) => axios.post(url+`uploadfiles`,newImg,{ headers: {"Authorization" : `Bearer ${token}`} }),
            getmyblogs: (id) => axios.get(url+`mypost`,{ headers: {"Authorization" : `Bearer ${token}`} })
        }
    }
}