import api from './api';
import blogapi from './blogapi'
import * as authconst from './constants/authConstants'
import * as blogconst from './constants/blogConstants'


//===========================================USER ACTION===========================

//REGISTER USER
export const register = (contact,onSuccess,onError) => dispatch => {
  api.User().register(contact)
      .then(res => {
        console.log(res)
        dispatch({
          type: authconst.REGISTER,
          payload: res.data
      })
      onSuccess()
      })
      .catch(err => {
        console.log(err.response.data)
        dispatch({
          type: authconst.REGISTER,
          payload: err.response.data
      })
      onError()
      })
}
//LOGIN USER 
export const login = (contact,onSuccess,onError) => dispatch => {
 
    api.User().login(contact)
    .then(res =>{
      console.log(res)
      dispatch({
          type: authconst.LOGIN,
          payload: res.data
      })
      onSuccess()
  })
  .catch(err =>{
    dispatch({
      type: authconst.LOGIN,
      payload: err.response.data
  })
  onError()
  } )

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
          dispatch({
              type: blogconst.FETCH_ALL_BLOGS,
              payload: res.data
          })
      })
      .catch(err => console.log(err))
}

  //FETCH MY BLOGS
  export const getmyblogs = (id) => dispatch => {
    blogapi.Blog().getmyblogs(id)
        .then(res => {
            dispatch({
                type: blogconst.FETCH_MY_BLOGS,
                payload: res.data.mypost
            })
        })
        .catch(err => console.log(err))
  }

  //UPDATE BLOGS
  export const updateBlogs = (id,data,onSuccess,onError) => dispatch => {
    blogapi.Blog().updateBlog(id,data)
        .then(res => {
          console.log(res)
          dispatch({
            type:blogconst.UPDATE_BLOG,
            payload:res.data
          })
          onSuccess()
        })
        .catch(err =>{
          onError()
          console.log(err)})
  }

  //DELETE BLOG
  export const Deleteblogs = (id,onSuccess) => dispatch => {
    console.log(id)
    blogapi.Blog().deleteBlog(id)
        .then(res => {
            dispatch({
                type: blogconst.DELETE_BLOG,
                payload: res.data
            })
            onSuccess()
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

        //CREATE BLOG 
        export const createblog = (data,onSuccess,onError) => dispatch => {
          blogapi.Blog().creaeBlog(data)
              .then(res => {
                console.log(res.data)
                  dispatch({
                      type: blogconst.CREATE_BLOG,
                      payload: res.data
                  })
                  onSuccess()
              })
              .catch(err =>{ onError()
                 console.log(err)})
        }

