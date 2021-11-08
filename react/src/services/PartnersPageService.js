import $api from "../http";

export default class PartnersPageService {
    static async get(page, params) {
        return $api.get(`partners/?page=${page}`, {params})
    }
    static async post(data) {
        return $api.post(`partners/`, data)
    }
    static async put(id, data) {
        return $api.put(`partners/${id}/`, data)
    }
    static async delete(id) {
        return $api.delete(`partners/${id}/`)
    }
    static async getDetail(id) {
        return $api.get(`partners/${id}/`)
    }
}