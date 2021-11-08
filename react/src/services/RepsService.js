import $api, {API_URL} from "../http";

export default class RepsService {

    static async getPartnerSales(params) {
        return $api.get(`reps-realization/`, {params})
    }
}