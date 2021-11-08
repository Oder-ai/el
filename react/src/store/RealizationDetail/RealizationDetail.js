import {makeAutoObservable, toJS} from "mobx";
import axios from "axios";
import RealizationService from "../../services/RealizationService";

export default class RealizationDetail {
    item = []

    deleted_items = []
    updated_items = []

    deleted_repayments = []
    updated_repayments = []

    deleted_refunds = []
    updated_refunds = []

    constructor() {
        makeAutoObservable(this)
    }

    async pushDeletedItem(id) {
        this.deleted_items.push(id)
    }

    async cancelDeletedItem(id) {
        this.deleted_items = this.deleted_items.filter(item => item !== id)
    }

    async clearDeletedItems() {
        this.deleted_items = []
    }

    async pushUpdatedItem(item) {
        this.updated_items.push(Object.assign({}, item))
    }

    async changeUpdatedItem(id, row, value) {
        const updated_item = this.updated_items.find(item => item.id === id)
        updated_item[row] = value
    }

    async cancelUpdatedItem(id) {
        this.updated_items = this.updated_items.filter(item => item.id !== id)
    }

    async clearUpdatedItems() {
        this.updated_items = []
    }




    async pushDeletedRepayment(id) {
        this.deleted_repayments.push(id)
    }

    async cancelDeletedRepayment(id) {
        this.deleted_repayments = this.deleted_repayments.filter(item => item !== id)
    }

    async clearDeletedRepayments() {
        this.deleted_repayments = []
    }

    async pushUpdatedRepayment(item) {
        this.updated_repayments.push(Object.assign({}, item))
    }

    async changeUpdatedRepayment(id, row, value) {
        const updated_item = this.updated_repayments.find(item => item.id === id)
        updated_item[row] = value
    }

    async cancelUpdatedRepayment(id) {
        this.updated_repayments = this.updated_repayments.filter(item => item.id !== id)
    }

    async clearUpdatedRepayments() {
        this.updated_repayments = []
    }





    async pushDeletedRefund(id) {
        this.deleted_refunds.push(id)
    }

    async cancelDeletedRefund(id) {
        this.deleted_refunds = this.deleted_refunds.filter(item => item !== id)
    }

    async clearDeletedRefunds() {
        this.deleted_refunds = []
    }

    async pushUpdatedRefund(item) {
        this.updated_refunds.push(Object.assign({}, item))
    }

    async changeUpdatedRefund(id, row, value) {
        const updated_item = this.updated_refunds.find(item => item.id === id)
        updated_item[row] = value
    }

    async cancelUpdatedRefund(id) {
        this.updated_refunds = this.updated_refunds.filter(item => item.id !== id)
    }

    async clearUpdatedRefunds() {
        this.updated_refunds = []
    }

    async clearAllChanges() {
        this.deleted_items = []
        this.updated_items = []
        this.deleted_repayments = []
        this.updated_repayments = []
        this.deleted_refunds = []
        this.updated_refunds = []
    }

    async sendChanges() {
        if (this.updated_refunds) {
            for (const item of this.updated_refunds) {
                try {
                    await RealizationService.putRefund(item.id, item)
                } catch (e) {
                    console.log(e)
                }
            }
        }
        if (this.updated_repayments) {
            for (const item of this.updated_repayments) {
                try {
                    await RealizationService.putPayout(item.id, item)
                } catch (e) {
                    console.log(e)
                }
            }
        }
        if (this.updated_items) {
            for (const item of this.updated_items) {
                try {
                    await RealizationService.putProduct(item.id, item)
                } catch (e) {
                    console.log(e)
                }
            }
        }
        if (this.deleted_repayments) {
            for (const id of this.deleted_repayments) {
                try {
                    await RealizationService.deletePayout(id)
                } catch (e) {
                    console.log(e)
                }
            }
        }
        if (this.deleted_refunds) {
            for (const id of this.deleted_refunds) {
                try {
                    await RealizationService.deleteRefund(id)
                } catch (e) {
                    console.log(e)
                }
            }
        }
        if (this.deleted_items) {
            for (const id of this.deleted_items) {
                try {
                    await RealizationService.deleteProduct(id)
                } catch (e) {
                    console.log(e)
                }
            }
        }
        this.clearAllChanges()
    }

    async deleteRealization(id) {
        try {
            await RealizationService.delete(id)
        } catch (e) {
            console.log(e)
        }
    }




    async getItem(id) {
        try {
            const response = await RealizationService.getDetail(id)
            const data = response.data
            this.item = data
        } catch (e) {
            console.log(e)
        }
    }
}
