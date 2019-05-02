import axios from 'axios'
import dev from '../../config/dev'
import server from '../../config/server'

export const API_URL = process.env.SERVER_ENV === 'remote' ? server.API_URL : dev.API_URL

export default axios.create({
    baseURL: process.env.SERVER_ENV === 'remote' ? server.API_URL : dev.API_URL,
    timeout: 1000
})