from django.urls import path, include
from crm_api import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'partners', views.PartnerViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'product-categories', views.ProductCategoryViewSet)
router.register(r'product-colors', views.ProductColorViewSet)
router.register(r'product-sizes', views.ProductSizeViewSet)
router.register(r'images', views.ProductImageViewSet)
router.register(r'realizations', views.RealizationViewSet)
router.register(r'realization-products', views.RealizationProductViewSet)
router.register(r'realization-product-payouts', views.RealizationProductPayoutViewSet)
router.register(r'realization-product-refunds', views.RealizationProductRefundViewSet)
router.register(r'production', views.ProductionViewSet)
router.register(r'product-images', views.ProductImageViewSet)


urlpatterns = [
    path('', include(router.urls)),
    # path('', views.api_root),
    # path('products/', views.ProductList.as_view()),
    # path('snippets/<int:pk>/', views.SnippetDetail.as_view()),
    # path('snippets/<int:pk>/highlight/', views.SnippetHighlight.as_view()),
    # path('users/', views.UserList.as_view()),
    # path('users/<int:pk>/', views.UserDetail.as_view()),
]