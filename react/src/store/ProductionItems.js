import {makeAutoObservable, toJS} from "mobx";
import axios from "axios";
import RealizationService from "../services/RealizationService";
import ProductionService from "../services/ProductionService";

export default class ProductionItems {

    items = []
    current_item = {}
    status = false
    pairs = 0

    constructor() {
        makeAutoObservable(this)
    }

    get Status() {
        this.items.length ?
            this.status = true
            :
            this.status = false
        return this.status
    }
    get Pairs() {
        let count = 0
        for (const i of this.items) {
            count += Number(i.pairs)
        }
        this.pairs = count
        return this.pairs
    }

    async pushItem(instance) {
        this.items.push(instance)
    }
    async changeItem(id, value) {
        const updated_item = this.items.find(item => item.product === id)
        for (const row in value) {
            updated_item[row] = value[row]
        }
    }
    async cancelItem(color_id) {
        this.items = this.items.filter(item => item.color !== color_id)
    }
    async clearItems() {
        this.items = []
    }
    async setCurrentItem(instance) {
        this.current_item = Object.assign({}, instance)
    }


    async sendChanges() {
        if (this.items) {
            for (const item of this.items) {
                try {
                    await ProductionService.post(item)
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
}
