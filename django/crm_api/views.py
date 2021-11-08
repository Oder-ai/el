from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView

from .actualizers import destroy_partnerSingleRealizationActualizer, destroy_singlProductColorActualizer, \
    destroy_RefundProductColorActualizer
from .permissions import *
from .filters import ProductFilter, RealizationFilter, CategoryFilter, ProductionFilter, \
    PartnerPageFilter
from .paginations import StandardResultsSetPagination
from .serializers import *
from django_filters import rest_framework as filters

class PartnerViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.action == 'list':
            return PartnerListSerializer
        return PartnerSerializer
    queryset = Partner.objects.all()
    pagination_class = StandardResultsSetPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = PartnerPageFilter
    permission_classes = [IsAdmin | IsBooker]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProductFilter
    permission_classes = [IsAdmin | IsBooker | IsWarehouseman]

class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CategoryFilter
    permission_classes = [IsAdmin | IsBooker | IsWarehouseman]

class ProductSizeViewSet(viewsets.ModelViewSet):
    queryset = ProductSize.objects.all()
    serializer_class = ProductSizeSerializer
    permission_classes = [IsAdmin | IsBooker | IsWarehouseman]

class ProductColorViewSet(viewsets.ModelViewSet):
    queryset = ProductColor.objects.all()
    serializer_class = ProductColorSerializer
    permission_classes = [IsAdmin | IsBooker | IsWarehouseman]

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAdmin | IsBooker | IsWarehouseman]


class RealizationProductViewSet(viewsets.ModelViewSet):
    queryset = RealizationProduct.objects.all()
    serializer_class = RealizationProductSerializer
    permission_classes = [IsAdmin | IsBooker]

    def perform_create(self, serializer):
        instance = serializer.save()
        partnerSingleRealizationActualizer(instance.realization.id)

    def perform_update(self, serializer):
        instance = serializer.save()
        partnerSingleRealizationActualizer(instance.realization.id)

    def perform_destroy(self, instance):
        destroy_singlProductColorActualizer(instance)
        instance.delete()
        partnerSingleRealizationActualizer(instance.realization.id)

class RealizationProductPayoutViewSet(viewsets.ModelViewSet):
    queryset = RealizationProductPayout.objects.all()
    serializer_class = RealizationProductPayoutSerializer
    permission_classes = [IsAdmin | IsBooker]

    def perform_create(self, serializer):
        instance = serializer.save()
        partnerSingleRealizationActualizer(instance.realization.id)

    def perform_update(self, serializer):
        instance = serializer.save()
        partnerSingleRealizationActualizer(instance.realization.id)

    def perform_destroy(self, instance):
        instance.delete()
        partnerSingleRealizationActualizer(instance.realization.id)

class RealizationProductRefundViewSet(viewsets.ModelViewSet):
    queryset = RealizationProductRefund.objects.all()
    serializer_class = RealizationProductRefundSerializer
    permission_classes = [IsAdmin | IsBooker]

    def perform_create(self, serializer):
        instance = serializer.save()
        partnerSingleRealizationActualizer(instance.realization.id)

    def perform_update(self, serializer):
        instance = serializer.save()
        partnerSingleRealizationActualizer(instance.realization.id)

    def perform_destroy(self, instance):
        destroy_RefundProductColorActualizer(instance)
        instance.delete()
        partnerSingleRealizationActualizer(instance.realization.id)

class RealizationViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.action == 'list':
            return RealizationListSerializer
        if self.action == 'update':
            return RealizationListSerializer
        return RealizationSerializer

    queryset = Realization.objects.all()
    serializer_class = RealizationSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = RealizationFilter
    permission_classes = [IsAdmin | IsBooker]


    def perform_destroy(self, instance):
        destroy_partnerSingleRealizationActualizer(instance)
        instance.delete()
        PartnerAllRealizationActualizer(instance.partner.id)


# class RepsRealizationViewSet(viewsets.ModelViewSet):
#
#     queryset = Realization.objects.all()
#     serializer_class = RepsRealizationSerializer
#     filter_backends = (filters.DjangoFilterBackend,)
#     filterset_class = RealizationFilter
#
#     def perform_destroy(self, instance):
#         instance.delete()
#         PartnerAllRealizationActualizer(instance.partner.id)


class ProductionViewSet(viewsets.ModelViewSet):
    queryset = Production.objects.all()
    serializer_class = ProductionSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProductionFilter
    def perform_update(self, serializer):
        instance = serializer.save()
        ProductColorActualizer(instance.color.id)

    def perform_destroy(self, instance):
        instance.delete()
        ProductColorActualizer(instance.color.id)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# class SnippetList(APIView):
#     """
#     List all snippets, or create a new snippet.
#     """
#     def get(self, request, format=None):
#         snippets = Snippet.objects.all()
#         serializer = SnippetSerializer(snippets, many=True)
#         return Response(serializer.data)
#
#     def post(self, request, format=None):
#         serializer = SnippetSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)