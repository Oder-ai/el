import {makeAutoObservable} from "mobx";
import RealizationService from "../services/RealizationService";
import axios from "axios";
import {API_URL} from "../http";
import ProductService from "../services/PartnerService";
import RepsService from "../services/RepsService";

export default class Reps {

    reps_partner_sales = []

    constructor() {
        makeAutoObservable(this)
    }

    async getPartnerSales (params) {
        try {
            const response = await RepsService.getPartnerSales(params)
            const data = response.data
            this.reps_partner_sales = data
        } catch (e) {
            console.log(e)
        }
    }

}
