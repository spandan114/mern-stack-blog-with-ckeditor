import { combineReducers } from "redux";
import { authReducer } from "./AuthReducer";
import { BlogReducer } from "./BlogReducer";


export default combineReducers({
    authReducer,
    BlogReducer
});