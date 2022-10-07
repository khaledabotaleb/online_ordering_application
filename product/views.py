from django.shortcuts import render
from rest_framework.generics import GenericAPIView, CreateAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated

from product.models import Product
from product.permissions import ProductOwnerPermission
from product.serializers import ProductSerializer


# Create your views here.


class ProductApiView(CreateAPIView, ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class ProductDetailApiView(RetrieveAPIView, UpdateAPIView, DestroyAPIView):
    permission_classes = [IsAuthenticated, ProductOwnerPermission]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()