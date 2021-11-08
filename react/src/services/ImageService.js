import $api, {API_URL} from "../http";

export default class ImageService {

    static async get() {
        return $api.get(`images/`, )
    }

    static async post(data) {
        return $api.post(`images/`, data)
    }
    static async delete(id) {
        return $api.delete(`images/${id}`, )
    }
}