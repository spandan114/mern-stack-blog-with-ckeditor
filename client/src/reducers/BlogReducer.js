import * as blogConstants from '../Actions/constants/blogConstants'
 const initialState = {
    blog: null,
    myblog: null
};

export const BlogReducer = (state = initialState, action) => {
  switch (action.type) {

    
    //FETCH ALL BLOGS
    case blogConstants.FETCH_ALL_BLOGS:
      return {
        ...state,
        blog: action.payload.blogs,
      };

    //FETCH ALL BLOGS
    case blogConstants.FETCH_MY_BLOGS:
      return {
        ...state,
        myblog: action.payload,
      };

    //FETCH ALL BLOGS ID
    case blogConstants.FETCH_BLOG_BY_ID:
      console.log(action.payload)
    //   let arr = state.blog.filter((blog) => blog._id == action.payload);
    //   console.log(arr)
    //   arr = arr.values();
    //  for(let val of arr){
    //    arr = val;
    //  }
      return {
        ...state,
        blog: [action.payload]
      };


    //DELETE BLOG
      case blogConstants.DELETE_BLOG:
        console.log(action.payload._id)
      return {
        ...state,
        blog:state.blog.filter(x => x._id !== action.payload._id)
      };
     
    default:
      return state;
  }
}