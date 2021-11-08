from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import *




class CustomUserAdmin(UserAdmin):
    fieldsets = (
        *UserAdmin.fieldsets,  # original form fieldsets, expanded
        (                      # new fieldset added on to the bottom
            'Custom Field Heading',  # group heading of your choice; set to None for a blank space instead of a header
            {
                'fields': (
                    'role',
                ),
            },
        ),
    )

admin.site.register(CrmUser, CustomUserAdmin)
admin.site.register(ProductCategory)
admin.site.register(Realization)
admin.site.register(RealizationProduct)
admin.site.register(RealizationProductPayout)
admin.site.register(RealizationProductRefund)
admin.site.register(Production)
admin.site.register(Product)
admin.site.register(ProductColor)
admin.site.register(ProductImage)