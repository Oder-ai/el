import $api, {API_URL} from "../http";

export default class CategoryService {

    static async get(params) {
        return $api.get(`product-categories/`, {params})
    }
    static async post(data) {
        return $api.post(`product-categories/`, data)
    }
    static async delete(id) {
        return $api.delete(`product-categories/${id}`, )
    }
}