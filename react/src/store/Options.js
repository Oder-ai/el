import {makeAutoObservable, toJS} from "mobx";
import RealizationService from "../services/RealizationService";
import axios from "axios";
import {API_URL} from "../http";
import PartnersPageService from "../services/PartnersPageService";

export default class Options {

    modal_products_state = false

    constructor() {
        makeAutoObservable(this)
    }

    async setModalActive(bool) {
        this.modal_products_state = bool
    }
}
