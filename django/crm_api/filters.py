from django.db.models import Q
from django_filters import rest_framework as filters
from .models import *

class ProductFilter(filters.FilterSet):
    search = filters.CharFilter(method='search_article', label="search")
    min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')
    category = filters.NumberFilter(field_name='category')
    order_by = filters.OrderingFilter(
        fields=(
            ('total_quantity', 'total_quantity'),
            ('created_at', 'created_at'),
            ('price', 'price'),
        )
    )

    class Meta:
        model = Product
        fields = ['category', 'min_price', 'max_price', 'id']

    def search_article(self, queryset, name, value):
        return Product.objects.filter(article_number__icontains=value)

class RealizationFilter(filters.FilterSet):
    created_at = filters.DateFromToRangeFilter()
    search = filters.CharFilter(method='search_by_id_or_partner', label="search")
    partner = filters.NumberFilter(field_name='partner')
    order_by = filters.OrderingFilter(
        fields=(
            ('id', 'id'),
            ('created_at', 'created_at'),
            ('partner', 'partner'),
            ('status', 'status'),
            ('product_qty', 'product_qty'),
            ('pairs_qty', 'pairs_qty'),
            ('debt', 'debt'),
        )
    )

    class Meta:
        model = Realization
        fields = ['created_at']

    def search_by_id_or_partner(self, queryset, name, value):
        return Realization.objects.filter(
            Q(partner__name__icontains=value) | Q(id__startswith=value)
        )


class ProductionFilter(filters.FilterSet):
    created_at = filters.DateFromToRangeFilter()
    order_by = filters.OrderingFilter(
        fields=(
            ('id', 'id'),
            ('created_at', 'created_at'),
            ('product', 'product'),
            ('color', 'color'),
            ('pairs', 'pairs'),
            ('packages', 'packages'),
            ('bags', 'bags'),
            ('defect_worker', 'defect_worker'),
            ('defect_worker_sum', 'defect_worker_sum'),
            ('defect_machine', 'defect_machine'),
            ('defect_machine_sum', 'defect_machine_sum'),
            ('defect_mehmed', 'defect_mehmed'),
            ('defect_mehmed_sum', 'defect_mehmed_sum'),
        )
    )

    class Meta:
        model = Production
        fields = ['created_at']


class CategoryFilter(filters.FilterSet):
    search = filters.CharFilter(field_name='category_name', lookup_expr='icontains')

    class Meta:
        model = ProductCategory
        fields = ['id', 'category_name']

class PartnerFilter(filters.FilterSet):
    search = filters.CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Partner
        fields = ['id']

class PartnerPageFilter(filters.FilterSet):
    search = filters.CharFilter(method='search_by_id_or_name', label="search")
    order_by = filters.OrderingFilter(
        fields=(
            ('id', 'id'),
            ('name', 'name'),
            ('first_name', 'first_name'),
            ('last_name', 'last_name'),
            ('phone_number', 'phone_number'),
            ('email', 'email'),
            ('released', 'released'),
            ('returned', 'returned'),
            ('paid', 'paid'),
            ('debt', 'debt'),
        )
    )

    class Meta:
        model = Partner
        fields = ['id']

    def search_by_id_or_name(self, queryset, name, value):
        return Partner.objects.filter(
            Q(name__icontains=value) | Q(id__startswith=value)
        )
