import axios from "axios";

export default {
    User(url = '/auth') {
        return {
            register: newRecord => axios.post(url+'/register', newRecord),
            login: newRecord => axios.post(url+'/login', newRecord)
        }
    }
}