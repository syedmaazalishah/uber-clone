import axios from 'axios' ;

const ServerURL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000' ;

const instance = axios.create({
    baseURL : ServerURL ,
    headers : {
        "Content-Type" : 'application/json' ,
        Authorization : `Bearer ${localStorage?.token}`
     }
})

export default instance ;