import {makeAutoObservable} from "mobx";
import axios from "axios";
import AuthService from "../services/AuthService";
import {API_URL} from "../http";

export default class User {
    user = {}
    isAuth = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.isAuth = bool
    }
    setUser(user) {
        this.user = user
    }

    async login(username, password) {
        try {
            const response = await AuthService.login(username, password)
            if (response.request.status === 401) {
                return 401
            }
            localStorage.setItem('token', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
            localStorage.setItem('username', response.data.user.username)
            localStorage.setItem('role', response.data.user.role)
            this.setAuth(true)
            this.setUser(response.data.user)

        } catch (e) {
            console.log(e)
        }
    }
    async logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('username')
        localStorage.removeItem('role')
        this.setAuth(false)
        this.setUser({})
    }
    async checkAuth() {
        try {
            const refreshToken = localStorage.getItem('refreshToken')
            if (refreshToken) {
                const response = await axios.post(`${API_URL}api/token/refresh/`, {refresh: refreshToken})
                localStorage.setItem('token', response.data.access)
                const username = localStorage.getItem('username')
                const role = localStorage.getItem('role')
                this.setUser({username, role})
                this.setAuth(true)
            } else {
                this.setAuth(false)
                this.setUser({})
            }
        } catch (e) {
            console.log(e)
        }
    }
}
