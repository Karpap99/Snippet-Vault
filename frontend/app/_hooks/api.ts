import axios from "axios";


export const PublicApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
})