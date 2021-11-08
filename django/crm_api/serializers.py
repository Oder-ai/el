from django.db.models import F
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


from .actualizers import partnerSingleRealizationActualizer, PartnerAllRealizationActualizer, ProductColorActualizer
from .models import *
from django.contrib.auth.models import User

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'

class ProductColorSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), required=False,
                                                       allow_null=True, default=None)
    quantity = serializers.ReadOnlyField()

    class Meta:
        model = ProductColor
        fields = ['pk', 'product', 'color', 'quantity']

class ProductImageSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), required=False,
                                                 allow_null=True, default=None)
    class Meta:
        model = ProductImage
        fields = ['pk', 'product', 'image']

class ProductSizeSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), required=False,
                                                 allow_null=True, default=None)
    class Meta:
        model = ProductSize
        fields = ['pk', 'product', 'size']


class ProductSerializer(serializers.ModelSerializer):
    product_colors = ProductColorSerializer(many=True, required=False)
    product_sizes = ProductSizeSerializer(many=True, required=False)
    product_images = ProductImageSerializer(many=True, required=False)
    price = serializers.IntegerField(required=False)
    total_quantity = serializers.ReadOnlyField()
    category_name = serializers.SerializerMethodField("get_productCategory")

    def get_productCategory(self, obj):
        return obj.category.category_name

    class Meta:
        model = Product
        fields = ['pk', 'category', 'article_number', 'price', 'total_quantity',
                  'created_at', 'product_colors', 'product_sizes', 'product_images', 'category_name']

    def create(self, validated_data):
        product_colors = []
        product_sizes = []
        if 'product_colors' in validated_data:
            product_colors = validated_data.pop('product_colors')
        if 'product_sizes' in validated_data:
            product_sizes = validated_data.pop('product_sizes')
        product = Product.objects.create(**validated_data)
        if bool(product_colors):
            for product_color in product_colors:
                print(product_color)
                product_color.pop('product')
                ProductColor.objects.create(product=product, **product_color)
        if bool(product_sizes):
            for product_size in product_sizes:
                product_size.pop('product')
                ProductSize.objects.create(product=product, **product_size)
        return product

    def update(self, instance, validated_data):
        instance.category = validated_data.get('category', instance.category)
        instance.article_number = validated_data.get('article_number', instance.article_number)
        instance.price = validated_data.get('price', instance.price)
        instance.save()
        return instance


class RealizationProductSerializer(serializers.ModelSerializer):
    is_closed = serializers.ReadOnlyField()
    paid = serializers.ReadOnlyField()
    debt = serializers.ReadOnlyField()
    returned = serializers.ReadOnlyField()
    product_article = serializers.SerializerMethodField("get_productArticle")
    product_color = serializers.SerializerMethodField("get_productColor")
    realization = serializers.PrimaryKeyRelatedField(queryset=Realization.objects.all(), required=False,
                                                 allow_null=True, default=None)

    def get_productArticle(self, obj):
        return obj.product.article_number
    def get_productColor(self, obj):
        return obj.color.color

    class Meta:
        model = RealizationProduct
        fields = '__all__'

class RealizationProductPayoutSerializer(serializers.ModelSerializer):
    returned = serializers.ReadOnlyField()
    debt = serializers.ReadOnlyField()
    paid = serializers.ReadOnlyField()
    released = serializers.ReadOnlyField()
    product_article = serializers.SerializerMethodField("get_productArticle")
    product_color = serializers.SerializerMethodField("get_productColor")
    product_id = serializers.SerializerMethodField("get_productId")

    def get_productArticle(self, obj):
        return obj.product.product.article_number

    def get_productColor(self, obj):
        return obj.product.color.color

    def get_productId(self, obj):
        return obj.product.product.id

    class Meta:
        model = RealizationProductPayout
        fields = '__all__'

class RealizationProductRefundSerializer(serializers.ModelSerializer):
    returned = serializers.ReadOnlyField()
    released = serializers.ReadOnlyField()
    product_article = serializers.SerializerMethodField("get_productArticle")
    product_color = serializers.SerializerMethodField("get_productColor")
    product_id = serializers.SerializerMethodField("get_productId")

    def get_productArticle(self, obj):
        return obj.product.product.article_number

    def get_productColor(self, obj):
        return obj.product.color.color

    def get_productId(self, obj):
        return obj.product.product.id


    class Meta:
        model = RealizationProductRefund
        fields = '__all__'

class RealizationListSerializer(serializers.ModelSerializer):
    is_closed = serializers.ReadOnlyField()
    product_qty = serializers.ReadOnlyField()
    pairs_qty = serializers.ReadOnlyField()
    released = serializers.ReadOnlyField()
    paid = serializers.ReadOnlyField()
    debt = serializers.ReadOnlyField()
    returned = serializers.ReadOnlyField()
    partner = serializers.SerializerMethodField("get_partnerName")
    partner_id = serializers.SerializerMethodField("get_partnerId")

    def get_partnerName(self, obj):
        return obj.partner.name

    def get_partnerId(self, obj):
        return obj.partner.id

    class Meta:
        model = Realization
        fields = '__all__'

class RealizationSerializer(serializers.ModelSerializer):
    products_in_realization = RealizationProductSerializer(many=True, required=True)
    realizations_refund = RealizationProductRefundSerializer(many=True, required=False)
    realizations_payout = RealizationProductPayoutSerializer(many=True, required=False)
    is_closed = serializers.ReadOnlyField()
    product_qty = serializers.ReadOnlyField()
    pairs_qty = serializers.ReadOnlyField()
    released = serializers.ReadOnlyField()
    paid = serializers.ReadOnlyField()
    debt = serializers.ReadOnlyField()
    returned = serializers.ReadOnlyField()
    partner_name = serializers.SerializerMethodField("get_partnerName")

    def get_partnerName(self, obj):
        return obj.partner.name

    class Meta:
        model = Realization
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)
        products_in_realization = []
        if 'products_in_realization' in validated_data:
            products_in_realization = validated_data.pop('products_in_realization')
        realization = Realization.objects.create(**validated_data)
        if bool(products_in_realization):
            for product_in_realization in products_in_realization:
                product_in_realization.pop('realization')
                RealizationProduct.objects.create(realization=realization, **product_in_realization)
                partnerSingleRealizationActualizer(realization.id)
                PartnerAllRealizationActualizer(realization.partner.id)
        return realization

    def update(self, instance, validated_data):
        instance.created_at = validated_data.get('created_at', instance.created_at)
        instance.save()
        return instance

class RepsRealizationSerializer(serializers.ModelSerializer):
    products_in_realization = RealizationProductSerializer(many=True, required=True)
    realizations_refund = RealizationProductRefundSerializer(many=True, required=False)
    realizations_payout = RealizationProductPayoutSerializer(many=True, required=False)
    is_closed = serializers.ReadOnlyField()
    product_qty = serializers.ReadOnlyField()
    pairs_qty = serializers.ReadOnlyField()
    released = serializers.ReadOnlyField()
    paid = serializers.ReadOnlyField()
    debt = serializers.ReadOnlyField()
    returned = serializers.ReadOnlyField()
    partner_name = serializers.SerializerMethodField("get_partnerName")

    def get_partnerName(self, obj):
        return obj.partner.name

    class Meta:
        model = Realization
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)
        products_in_realization = []
        if 'products_in_realization' in validated_data:
            products_in_realization = validated_data.pop('products_in_realization')
        realization = Realization.objects.create(**validated_data)
        if bool(products_in_realization):
            for product_in_realization in products_in_realization:
                product_in_realization.pop('realization')
                RealizationProduct.objects.create(realization=realization, **product_in_realization)
                partnerSingleRealizationActualizer(realization.id)
                PartnerAllRealizationActualizer(realization.partner.id)
        return realization

    def update(self, instance, validated_data):
        instance.created_at = validated_data.get('created_at', instance.created_at)
        instance.save()
        return instance

class PartnerSerializer(serializers.ModelSerializer):
    partner_realizations = RealizationSerializer(many=True, read_only=True)
    released = serializers.ReadOnlyField()
    paid = serializers.ReadOnlyField()
    debt = serializers.ReadOnlyField()
    returned = serializers.ReadOnlyField()

    class Meta:
        model = Partner
        fields = '__all__'

class PartnerListSerializer(serializers.ModelSerializer):
    released = serializers.ReadOnlyField()
    paid = serializers.ReadOnlyField()
    debt = serializers.ReadOnlyField()
    returned = serializers.ReadOnlyField()

    class Meta:
        model = Partner
        fields = '__all__'

class ProductionSerializer(serializers.ModelSerializer):
    product_article = serializers.SerializerMethodField("get_productArticle")
    product_color = serializers.SerializerMethodField("get_productColor")

    def get_productArticle(self, obj):
        return obj.product.article_number

    def get_productColor(self, obj):
        return obj.color.color

    class Meta:
        model = Production
        fields = '__all__'

    def create(self, validated_data):
        production = Production.objects.create(**validated_data)
        ProductColorActualizer(production.color.id)
        return production



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        # Add extra responses here
        data['user'] = {
            'username': self.user.username,
            'role': self.user.role
        }
        return data

