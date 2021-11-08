import $api from "../http";

export default class ProductionService {
    static async get(page, params) {
        return $api.get(`production/?page=${page}`, {params})
    }
    static async post(data) {
        return $api.post(`production/`, data)
    }
    static async put(id, data) {
        return $api.put(`production/${id}/`, data)
    }
    static async delete(id) {
        return $api.delete(`production/${id}/`)
    }
}