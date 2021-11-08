import $api from '../http'

export default class AuthService {
    static async login(username, password) {
        return $api.post('api/token/', {username, password})
    }
    static async refresh(refreshToken) {
        return $api.post('api/token/refresh', {refresh: refreshToken})
    }
}