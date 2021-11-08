from django.db import models
from django.contrib.auth.models import AbstractUser

class CrmUser(AbstractUser):
    role = models.CharField(max_length=250)

class Partner(models.Model):
    name = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    phone_number = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(max_length=255, null=True, blank=True)
    note = models.TextField(null=True, blank=True)
    released = models.IntegerField(default=0)
    returned = models.IntegerField(default=0)
    paid = models.IntegerField(default=0)
    debt = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.name

class ProductCategory(models.Model):
    category_name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.category_name

class Product(models.Model):
    category = models.ForeignKey(ProductCategory, on_delete=models.SET_NULL, null=True, related_name='products')
    article_number = models.CharField(max_length=255, unique=True)
    price = models.PositiveIntegerField(default=0)
    total_quantity = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.article_number

class ProductColor(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_colors')
    color = models.CharField(max_length=255)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return 'Товар {}, цвет {}, количество {}'.format(self.product, self.color, self.quantity)

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_images')
    image = models.ImageField()

    def __str__(self):
        return self.image.url

class ProductSize(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_sizes')
    size = models.CharField(max_length=255)

    def __str__(self):
        return self.size


################### REALIZATION ##########################################

class Realization(models.Model):
    partner = models.ForeignKey(Partner, on_delete=models.SET_NULL, null=True, related_name='partner_realizations')
    status = models.BooleanField(default=False)
    product_qty = models.IntegerField(default=0)
    pairs_qty = models.IntegerField(default=0)
    created_at = models.DateField()
    released = models.IntegerField(default=0)
    paid = models.IntegerField(default=0)
    debt = models.IntegerField(default=0)
    returned = models.IntegerField(default=0)

    def __str__(self):
        return 'R: {}'.format(self.id)

    class Meta:
        ordering = ['-id']

class RealizationProduct(models.Model):
    realization = models.ForeignKey(Realization, on_delete=models.CASCADE, related_name='products_in_realization')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    color = models.ForeignKey(ProductColor, on_delete=models.CASCADE, related_name='product_colors_in_realizations')
    is_closed = models.BooleanField(default=False)
    pairs = models.IntegerField(default=0)
    packages = models.IntegerField(default=0)
    bags = models.IntegerField(default=0)
    released = models.IntegerField(default=0)
    paid = models.IntegerField(default=0)
    debt = models.IntegerField(default=0)
    returned = models.IntegerField(default=0)

    def __str__(self):
        return 'R: {}, P: {}'.format(self.realization_id, self.id)

class RealizationProductPayout(models.Model):
    product = models.ForeignKey(RealizationProduct, on_delete=models.CASCADE,
                                            related_name='realization_products_payout')
    realization = models.ForeignKey(Realization, on_delete=models.CASCADE, related_name='realizations_payout')
    payout = models.IntegerField(default=0)
    released = models.IntegerField(default=0)
    paid = models.IntegerField(default=0)
    debt = models.IntegerField(default=0)
    returned = models.IntegerField(default=0)
    created_at = models.DateField()

    class Meta:
        ordering = ['-id']

class RealizationProductRefund(models.Model):
    product = models.ForeignKey(RealizationProduct, on_delete=models.CASCADE,
                                            related_name='realization_products_refund')
    realization = models.ForeignKey(Realization, on_delete=models.CASCADE, related_name='realizations_refund')
    refund = models.IntegerField(default=0)
    product_qty = models.IntegerField(default=0)
    returned = models.IntegerField(default=0)
    released = models.IntegerField(default=0)
    created_at = models.DateField()


################### PRODUCTION ##########################################

class Production(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, related_name='product_productions')
    color = models.ForeignKey(ProductColor, on_delete=models.SET_NULL, null=True, related_name='colors_in_productions')
    pairs = models.IntegerField(default=0)
    packages = models.IntegerField(default=0)
    bags = models.IntegerField(default=0)
    created_at = models.DateField()
    defect_worker = models.IntegerField(default=0)
    defect_worker_sum = models.IntegerField(default=0)
    defect_machine = models.IntegerField(default=0)
    defect_machine_sum = models.IntegerField(default=0)
    defect_mehmed = models.IntegerField(default=0)
    defect_mehmed_sum = models.IntegerField(default=0)

    class Meta:
        ordering = ['-id']