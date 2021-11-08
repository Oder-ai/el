import {makeAutoObservable, toJS} from "mobx";
import RealizationService from "../services/RealizationService";
import axios from "axios";
import $api, {API_URL, URL_SLICE} from "../http";
import PartnersPageService from "../services/PartnersPageService";

export default class PartnersPage {
    items = []
    items_count = 0
    current_page = 1
    page_count = 0
    first_page = 1
    last_page = 1

    next_url = ''
    previous_url = ''

    params = {
        search: '',
        order_by: ''
    }

    ITEMS_IN_PAGE = 40

    current_partner = {}

    constructor() {
        makeAutoObservable(this)
    }

    async setOrder (param) {
        this.params.order_by = param
        this.getPage()
    }
    async setSearch (param) {
        this.params.search = param
        this.getPage()
    }

    async setAttr(data) {
        this.items = data.results
        this.items_count = data.count
        this.page_count = Math.ceil(data.count/this.ITEMS_IN_PAGE)
        this.last_page = Math.ceil(data.count/this.ITEMS_IN_PAGE)
        if (!data.next) {
            this.next_url = data.next
        } else {
            this.next_url = data.next
        }
        if (!data.previous) {
            this.previous_url = data.previous
        } else {
            this.previous_url = data.previous
        }
    }


    async getNextPage () {
        try {
            const response = await $api.get(this.next_url.slice(URL_SLICE))
            const data = response.data
            await this.setAttr(data)
            if (this.current_page + 1 > this.page_count) {
                this.current_page = this.page_count
            } else {
                this.current_page += 1
            }
        } catch (e) {
            console.log(e)
        }
    }
    async getPreviousPage () {
        try {
            const response = await $api.get(this.previous_url.slice(URL_SLICE))
            const data = response.data
            await this.setAttr(data)
            if (this.current_page - 1 < 1) {
                this.current_page = 1
            } else {
                this.current_page -= 1
            }
        } catch (e) {
            console.log(e)
        }
    }

    async getPage (page = 1) {
        try {
            if (page < 1) {
                page = 1
            } else if (page > this.page_count && page !== 1) {
                page = this.page_count
            } else {
                page = 1
            }
            const response = await PartnersPageService.get(page , this.params)
            const data = response.data
            this.current_page = page
            await this.setAttr(data)
            this.current_page = page

        } catch (e) {
            console.log(e)
        }
    }

    async getPartner(id) {
        try {
            const response = await PartnersPageService.getDetail(id)
            const data = response.data
            this.current_partner = data
        } catch (e) {
            console.log(e)
        }
    }
}
