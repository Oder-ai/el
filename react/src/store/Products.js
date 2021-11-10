import {makeAutoObservable, toJS} from "mobx";
import ProductService from "../services/ProductService";
import axios from "axios";
import $api, {API_URL, URL_SLICE} from "../http";

export default class Products {
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
        min_price: '',
        max_price: '',
        category: '',
        order_by: ''
    }
    params_order = {
        text: ''
    }

    ITEMS_IN_PAGE = 40

    categories = []

    params_category = {
        search: '',
        category_text: '',
    }

    current_product_instance = null
    current_choiced_item = null
    choiced_product_items = []
    status = false

    total_pairs = 0
    total_summ = 0
    pairs = 0
    summ = 0

    constructor() {
        makeAutoObservable(this)
    }

    get Status() {
        this.choiced_product_items.length ?
            this.status = true
            :
            this.status = false
        return this.status
    }
    async clearChoicedItems() {
        this.choiced_product_items = []
    }

    get Pairs() {
        let count = 0
        for (const i of this.choiced_product_items) {
            count += Number(i.pairs)
        }
        this.pairs = count
        return this.pairs
    }
    get Summ() {
        let count = 0
        for (const i of this.choiced_product_items) {
            count += Number(i.released)
        }
        this.summ = count
        return this.summ
    }

    async totalPairs() {
        let count = 0
        for (const i of this.choiced_product_items) {
            count += Number(i.pairs)
        }
        this.total_pairs = count
    }
    async totalSumm() {
        let count = 0
        for (const i of this.choiced_product_items) {
            count += Number(i.released)
        }
        this.total_summ = count
    }

    async setCurrentChoicedItem(instance) {
        this.current_choiced_item = instance
    }

    async getProduct(product_id) {
        try {
            const response = await ProductService.getProduct(product_id)
            const data = response.data
            this.current_product_instance = data
        } catch (e) {
            console.log(e)
        }
    }

    async setChoicedProductItem(instance) {
        this.choiced_product_items.push(instance)
        this.totalPairs()
        this.totalSumm()
    }
    async changeChoicedProductItem(id, data) {
        const oldItem = this.choiced_product_items.find(item => item.product === data.product)
        oldItem.product = data.product
        oldItem.bags = data.bags
        oldItem.color = data.color
        oldItem.packages = data.packages
        oldItem.pairs = data.pairs
        oldItem.realization = data.realization
        oldItem.released = data.released
        oldItem.text.color = data.text.color
        oldItem.text.article = data.text.article
        oldItem.text.qty = data.text.qty
        oldItem.text.sum = data.text.sum
        this.totalPairs()
        this.totalSumm()
    }
    async deleteChoicedProductItem(color_id) {
        this.choiced_product_items = this.choiced_product_items.filter((item) => item.color !== color_id)
        this.totalPairs()
        this.totalSumm()
    }

    async setCurrentProductInstance(instance) {
        this.current_product_instance = instance
    }

    async setOrderText (param) {
        this.params_order.text = param
    }


    async setPriceFrom (param) {
        this.params.min_price = param
        this.getPage()
    }
    async setPriceTo (param) {
        this.params.max_price = param
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
    async setCategory (param, text) {
        this.params.category = param
        this.params_category.category_text = text
        this.getPage()
    }
    async setSearchCategory (text) {
        this.params_category.search = text
        this.params_category.category_text = text
        this.getCategories()
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
            const response = await ProductService.get(page , this.params)
            const data = response.data
            this.current_page = page
            await this.setAttr(data)
            this.current_page = page

        } catch (e) {
            console.log(e)
        }
    }

    async getCategories () {
        try {
            const response = await ProductService.getCategories({search: this.params_category.search})
            const data = response.data
            this.categories = data
        } catch (e) {
            console.log(e)
        }
    }
}
