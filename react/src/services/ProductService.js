import $api from "../http";

export default class ProductService {
    static async get(page, params) {
        return $api.get(`products/?page=${page}`, {params})
    }
    static async post(data) {
        return $api.post(`products/`, data)
    }
    static async getProduct(id) {
        return $api.get(`products/${id}/`)
    }
    static async getCategories(params) {
        return $api.get(`product-categories/`, {params})
    }
}