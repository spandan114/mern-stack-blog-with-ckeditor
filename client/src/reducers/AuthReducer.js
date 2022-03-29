  
 import * as authConstants from '../Actions/constants/authConstants'
 const initialState = {
  user: null,
  message: null
};
   
   export const authReducer = (state = initialState, action) => {

     switch (action.type) {
         //LOGIN
      case authConstants.LOGIN:
        // console.log(action.payload)
         if(action.payload.user){
        localStorage.setItem("jwt",action.payload.token)
        localStorage.setItem("user",JSON.stringify(action.payload.user))

        return {
          ...state,
            user: action.payload.user
        };
         }else{
          return {
            ...state,
            message: action.payload.error , 
          };
         }

         //REGISTER
         case authConstants.REGISTER:
          // console.log(action.payload)
           if(action.payload.error){ 
          return {
            ...state,
            message: action.payload.error
          };
           }else{
            return {
              ...state,
              message: action.payload.error , 
            };
           }

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