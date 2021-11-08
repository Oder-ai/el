import $api, {API_URL} from "../http";

export default class PartnerService {

    static async get(params) {
        return $api.get(`partners/`, {params})
    }

    static async post(data) {
        return $api.post(`partners/`, data)
    }
}