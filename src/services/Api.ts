import axios from 'axios'

const API = () => {
    return axios.create({
        baseURL: "http://localhost:8000/"
    })
}

export default API;