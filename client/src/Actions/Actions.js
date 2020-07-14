import api from './api';
import blogapi from './blogapi'
import * as authconst from './constants/authConstants'
import * as blogconst from './constants/blogConstants'

//===========================================USER ACTION===========================

//REGISTER USER
export const register = (contact) => {
  api.User().register(contact)
      .then(res => {
        console.log(res,contact)
      })
      .catch(err => console.log(err))

}
//LOGIN USER
export const login = (contact) => dispatch => {

    api.User().login(contact)
    .then(res =>{
      console.log(res)
      dispatch({
          type: authconst.LOGIN,
          payload: res.data
      })
  })
  .catch(err => console.log(err))

  };
//LOGOUT USER
export const logout = () => ({
  type: authconst.LOGOUT
  })
  //LOAD USER
export const relode = (data) => ({
    type: authconst.USER,
    payload: data
  })


  //=============================================BLOG ACTIONS====================

  //FETCH ALL BLOGS
export const getAllblogs = () => dispatch => {
  blogapi.Blog().getAllblogs()
      .then(res => {
        // console.log(res.data.blogs)
          dispatch({
              type: blogconst.FETCH_ALL_BLOGS,
              payload: res.data.blogs
          })
      })
      .catch(err => console.log(err))
}

  //UPDATE BLOGS
  export const updateBlogs = (id,data) => dispatch => {
    blogapi.Blog().updateBlog(id,data)
        .then(res => {
          console.log("blog updated successfully")
        })
        .catch(err => console.log(err))
  }

  //DELETE BLOG
  export const Deleteblogs = (id) => dispatch => {
    console.log(id)
    blogapi.Blog().deleteBlog(id)
        .then(res => {
            dispatch({
                type: blogconst.DELETE_BLOG,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
  }

    //FETCH BLOG BY ID
    export const getblogbyId = (id) => dispatch => {
      blogapi.Blog().getBlogbyId(id)
          .then(res => {
            console.log(res.data)
              dispatch({
                  type: blogconst.FETCH_BLOG_BY_ID,
                  payload: res.data.post
              })
          })
          .catch(err => console.log(err))
    }

    // export const getblogbyId = (id) => dispatch => {
    //   dispatch({
    //     type: blogconst.FETCH_BLOG_BY_ID,
    //     payload : id
    //   })
    //   }