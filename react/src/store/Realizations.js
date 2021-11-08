import {makeAutoObservable, toJS} from "mobx";
import RealizationService from "../services/RealizationService";
import axios from "axios";
import $api, {API_URL, URL_SLICE} from "../http";

export default class Realizations {
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
        created_at_after: '',
        created_at_before: '',
        order_by: ''
    }

    ITEMS_IN_PAGE = 40

    constructor() {
        makeAutoObservable(this)
    }


    async setDateAfter (param) {
        this.params.created_at_after = param
        this.getPage()
    }
    async setDateBefor (param) {
        this.params.created_at_before = param
        this.getPage()
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
            const response = await RealizationService.get(page , this.params)
            const data = response.data
            this.current_page = page
            await this.setAttr(data)
            this.current_page = page

        } catch (e) {
            console.log(e)
        }
    }
    async postRealization (Options, products) {
        try {
            const request_data = {
                partner: Options.partner,
                created_at: Options.date,
                products_in_realization: toJS(products)
            }
            const response = await RealizationService.post(request_data)
            const data = response.data
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }
}
