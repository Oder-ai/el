import {makeAutoObservable, toJS} from "mobx";
import ProductService from "../services/ProductService";
import axios from "axios";
import {API_URL} from "../http";
import CategoryService from "../services/CategoryService";

export default class ProductCreate {

    categories = []

    params = {
        search: '',
    }

    constructor() {
        makeAutoObservable(this)
    }

    async setSearchCategory (param) {
        this.params.search = param
        this.getCategories()
    }

    async getCategories () {
        try {
            const response = await CategoryService.get(this.params)
            const data = response.data
            this.categories = data
        } catch (e) {
            console.log(e)
        }
    }
}
