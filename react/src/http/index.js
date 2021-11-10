import axios from "axios";

// export const API_URL = 'http://80.249.151.57:8000/'
export const API_URL = 'http://localhost:8000/'
export const URL_SLICE = API_URL.length

const $api = axios.create({
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const refreshToken = localStorage.getItem('refreshToken')
            const response = await axios.post(`${API_URL}api/token/refresh/`, {refresh: refreshToken})
            localStorage.setItem('token', response.data.access)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('Не авторизован')
        }
    }
    return error
})

export default $api