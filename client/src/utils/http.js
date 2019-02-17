import axios from 'axios'
import dev from '../../config/dev'
import server from '../../config/server'

export default axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? dev.API_URL : server.API_URL,
    timeout: 1000
})