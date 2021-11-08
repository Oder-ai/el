import {makeAutoObservable} from "mobx";
import RealizationService from "../services/RealizationService";
import axios from "axios";
import {API_URL} from "../http";
import ProductService from "../services/PartnerService";
import PartnerService from "../services/PartnerService";

export default class Partners {

    items = []
    search_items = []
    search_partners = []
    current_partner = ''

    partnerSearchText = {text: '', id: ''}

    params = {
        search: ''
    }

    constructor() {
        makeAutoObservable(this)
    }

    async setSearchText(value) {
        this.partnerSearchText = {text: value, id: ''}
    }

    async setCurrentPartner(instance, bool=false) {
        this.current_partner = instance
        if (bool) {
            this.partnerSearchText = {text: instance.name, id: instance.id}
        } else {
            this.partnerSearchText = {...this.partnerSearchText, id: ''}
        }
    }

    async setSearch(value) {
        this.params.search = value
        const response = await ProductService.get(this.params)
        const data = response.data
        this.search_items = data
    }
    async setSearchPartner(value) {
        this.params.search = value
        const response = await PartnerService.get(this.params)
        const data = response.data
        this.search_partners = data
    }

    async postPartner(postData) {
        try {
            const response = await ProductService.post(postData)
            const data = response.data
            this.current_partner = data
            this.partnerSearchText = {text: data.name, id: data.id}
            return {text: data.name, id: data.id}
        } catch (e){
            console.log(e)
        }
    }

}
