import {makeAutoObservable, toJS} from "mobx";
import RealizationService from "../services/RealizationService";
import axios from "axios";
import {API_URL} from "../http";
import PartnersPageService from "../services/PartnersPageService";
import PartnerService from "../services/PartnerService";

export default class RealizationAddPage {

    partners = []

    params = {
        search: ''
    }

    constructor() {
        makeAutoObservable(this)
    }

    async setSearch(value) {
        this.params.search = value
        this.getPartners()
    }

    async getPartners() {
        try {
            const response = await PartnerService.get(this.params)
            const data = response.data.results
            this.partners = data
        } catch (e) {
            console.log(e)
        }
    }
}
