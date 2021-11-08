import {makeAutoObservable, toJS} from "mobx";
import axios from "axios";
import RealizationService from "../services/RealizationService";
import ProductionService from "../services/ProductionService";
import ProductService from "../services/ProductService";

export default class StoreDetail {

    item = {}

    constructor() {
        makeAutoObservable(this)
    }

    async getProduct (id) {
        try {
            const response = await ProductService.getProduct(id)
            const data = response.data
            this.item = data
        } catch (e) {
            console.log(e)
        }
    }
}
