import axios from "axios";

export default {
    Blog(url = '/api/blog/') {
        return {
            getAllblogs: () => axios.get(url+'getBlogs'),
            deleteBlog: id => axios.delete(url+`deletePost/${id}`),
            updateBlog: (id,newData) => axios.put(url+`updatePost/${id}`,newData),
            getBlogbyId: (id) => axios.post(url+`getPost/${id}`)
        }
    }
}