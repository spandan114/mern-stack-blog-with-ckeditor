  
 import * as authConstants from '../Actions/constants/authConstants'
 const initialState = {
  user: null
};
   
   export const authReducer = (state = initialState, action) => {

     switch (action.type) {
         //LOGIN
      case authConstants.LOGIN:
        console.log(action.payload.user)
        localStorage.setItem("jwt",action.payload.token)
        localStorage.setItem("user",JSON.stringify(action.payload.user))
        return {
          ...state,
            user: action.payload.user,...state.user
        };

         //LOGOUT
         case authConstants.LOGOUT : 
         return {
           ...state,
           user: null
         };

         case authConstants.USER : 
         return {
           ...state,
           user: action.payload
         };
       //default
       default:
         return state;
     }
   }