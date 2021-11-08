from .models import *
from django.db.models import F
def partnerSingleRealizationActualizer(realization_id):
    # Создание, удаление, обновление реализации, выплаты, возврата

    realization = Realization.objects.get(id=realization_id)
    realization_products = realization.products_in_realization.all()

    old_realization_released = realization.released
    old_realization_paid = realization.paid
    old_realization_returned = realization.returned
    old_realization_debt = realization.debt

    realization_released = 0
    realization_paid = 0
    realization_returned = 0
    realization_debt = 0
    realization_product_qty = 0
    realization_pairs_qty = 0

    for product in realization_products:
        realization_product_qty += 1
        realization_pairs_qty += product.pairs
        released = product.released

        paid = 0
        payouts = product.realization_products_payout.order_by('created_at')
        if bool(payouts):
            for payout in payouts:
                paid += payout.payout
                payout.released = released
                payout.paid = paid
                returned = 0
                for refund in product.realization_products_refund.filter(created_at__lte=payout.created_at):
                    returned += refund.refund
                payout.returned = returned
                payout.debt = released - (paid + returned)
                payout.save()

        returned = 0
        refunds = product.realization_products_refund.order_by('created_at')
        if bool(refunds):
            for refund in refunds:
                returned += refund.refund
                refund.released = released
                refund.returned = returned
                refund.save()

        product.paid = paid
        product.returned = returned
        product.debt = released - (paid + returned)
        product.save()

        realization_released += released
        realization_paid += paid
        realization_returned += returned
        realization_debt += product.debt

        ProductColorActualizer(product.color.id)

    realization.product_qty = realization_product_qty
    realization.pairs_qty = realization_pairs_qty
    realization.released = realization_released
    realization.returned = realization_returned
    realization.paid = realization_paid
    realization.debt = realization_debt
    realization.save()

    partner = realization.partner

    if realization_released > old_realization_released:
        partner.released = F('released') + (realization_released - old_realization_released)
    elif realization_released < old_realization_released:
        partner.released = F('released') - (old_realization_released - realization_released)
    else:
        partner.released = F('released')

    if realization_returned > old_realization_returned:
        partner.returned = F('returned') + (realization_returned - old_realization_returned)
    elif realization_returned < old_realization_returned:
        partner.returned = F('returned') - (old_realization_returned - realization_returned)
    else:
        partner.returned = F('returned')

    if realization_paid > old_realization_paid:
        partner.paid = F('paid') + (realization_paid - old_realization_paid)
    elif realization_paid < old_realization_paid:
        partner.paid = F('paid') - (old_realization_paid - realization_paid)
    else:
        partner.paid = F('paid')

    if realization_debt > old_realization_debt:
        partner.debt = F('debt') + (realization_debt - old_realization_debt)
    elif realization_debt < old_realization_debt:
        partner.debt = F('debt') - (old_realization_debt - realization_debt)
    else:
        partner.debt = F('debt')
    partner.save()





def PartnerAllRealizationActualizer(partner_id):
    # Создание, удаление реализации

    partner = Partner.objects.get(id=partner_id)
    realizations = partner.partner_realizations.all()

    partner.released = 0
    partner.returned = 0
    partner.paid = 0
    partner.debt = 0
    if bool(realizations):
        for realization in realizations:
            partner.released += realization.released
            partner.returned += realization.returned
            partner.paid += realization.paid
            partner.debt += realization.debt
    partner.save()

def ProductColorActualizer(color_id):
    # Создание, обновление, удаление выработки

    color = ProductColor.objects.get(id=color_id)
    productions = color.colors_in_productions.all()
    product_colors_in_realizations = color.product_colors_in_realizations.all()

    old_color_quantity = color.quantity

    color_quantity = 0
    color_in_realizations = 0

    if bool(productions):
        for production in productions:
            color_quantity += production.pairs

    if bool(product_colors_in_realizations):
        for product_color in product_colors_in_realizations:
            color_in_realizations += product_color.pairs
            refunds = product_color.realization_products_refund.all()
            for refund in refunds:
                color_quantity += refund.product_qty

    color_real_quantity = color_quantity - color_in_realizations

    color.quantity = color_real_quantity
    color.save()

    product = color.product
    if color_real_quantity > old_color_quantity:
        product.total_quantity = F('total_quantity') + (color_real_quantity - old_color_quantity)
    elif color_real_quantity < old_color_quantity:
        product.total_quantity = F('total_quantity') - (old_color_quantity - color_real_quantity)
    else:
        product.total_quantity = F('total_quantity')
    product.save()


def destroy_partnerSingleRealizationActualizer(instance):

    realization = instance
    realization_products = realization.products_in_realization.all()

    for product in realization_products:
        product_qty = product.pairs

        returned_product_qty = 0
        refunds = product.realization_products_refund.order_by('created_at')
        if bool(refunds):
            for refund in refunds:
                returned_product_qty += refund.product_qty

        product_final_qty = product_qty - returned_product_qty

        destroy_ProductColorActualizer(product.color.id, product_final_qty)


def destroy_singlProductColorActualizer(instance):
    product = instance

    product_qty = product.pairs

    returned_product_qty = 0
    refunds = product.realization_products_refund.order_by('created_at')
    if bool(refunds):
        for refund in refunds:
            returned_product_qty += refund.product_qty

    product_final_qty = product_qty - returned_product_qty

    destroy_ProductColorActualizer(product.color.id, product_final_qty)


def destroy_ProductColorActualizer(color_id, qty):

    color = ProductColor.objects.get(id=color_id)
    old_color_qty = color.quantity

    color.quantity = F('quantity') + qty
    color.save()
    color.refresh_from_db()

    new_color_qty = color.quantity

    product = color.product

    if new_color_qty > old_color_qty:
        product.total_quantity = F('total_quantity') + (new_color_qty - old_color_qty)
    elif new_color_qty < old_color_qty:
        product.total_quantity = F('total_quantity') - (old_color_qty - new_color_qty)
    else:
        product.total_quantity = F('total_quantity')
    product.save()

def destroy_RefundProductColorActualizer(instance):

    product_qty = instance.product_qty
    color = instance.product.color
    color.quantity = F("quantity") - product_qty
    color.save()
    product = color.product
    product.total_quantity = F("total_quantity") - product_qty
    product.save()
