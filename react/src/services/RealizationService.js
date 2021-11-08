import $api from "../http";

export default class RealizationService {
    static async get(page, params) {
        return $api.get(`realizations/?page=${page}`, {params})
    }
    static async post(data) {
        return $api.post(`realizations/`, data)
    }
    static async put(id, data) {
        return $api.put(`realizations/${id}/`, data)
    }
    static async delete(id) {
        return $api.delete(`realizations/${id}/`)
    }

    static async getDetail(id) {
        return $api.get(`realizations/${id}/`)
    }

    static async postProduct(data) {
        return $api.post(`realization-products/`, data)
    }
    static async putProduct(id, data) {
        return $api.put(`realization-products/${id}/`, data)
    }
    static async deleteProduct(id) {
        return $api.delete(`realization-products/${id}/`)
    }


    static async postPayout(data) {
        return $api.post(`realization-product-payouts/`, data)
    }
    static async putPayout(id, data) {
        return $api.put(`realization-product-payouts/${id}/`, data)
    }
    static async deletePayout(id) {
        return $api.delete(`realization-product-payouts/${id}/`)
    }


    static async postRefund(data) {
        return $api.post(`realization-product-refunds/`, data)
    }
    static async putRefund(id, data) {
        return $api.put(`realization-product-refunds/${id}/`, data)
    }
    static async deleteRefund(id) {
        return $api.delete(`realization-product-refunds/${id}/`)
    }
}