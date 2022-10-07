from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, NotAcceptable, ValidationError
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils.translation import gettext_lazy as _
from order.models import OrderCartItems, OrderCart
from order.serializers import CartItemSerializer, CartItemUpdateSerializer, OrderCartSerializer
from product.models import Product
from product.serializers import ProductSerializer


class ListProductsApiView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    pagination_class = None

    def get_queryset(self):
        return self.queryset.exclude(user=self.request.user)


class CartItemAPIView(CreateAPIView, RetrieveAPIView):
    serializer_class = CartItemSerializer
    pagination_class = None

    def get_object(self):
        user = self.request.user
        obj = get_object_or_404(OrderCart, user=user)
        return obj

    def create(self, request, *args, **kwargs):
        user = request.user
        cart = get_object_or_404(OrderCart, user=user)
        product = get_object_or_404(Product, pk=request.data["product"])
        current_item = OrderCartItems.objects.filter(order_cart=cart, product=product)

        if user == product.user:
            raise PermissionDenied("You Can not purchase your Product")

        if current_item.count() > 0:
            raise NotAcceptable("You already have this item in your cart")

        try:
            quantity = int(request.data["quantity"])
        except Exception as e:
            raise ValidationError("Please Enter Your Quantity")

        if quantity > product.stock_items:

            raise NotAcceptable("You order quantity more than that product have")

        cart_item = OrderCartItems(order_cart=cart, product=product, quantity=quantity)
        cart_item.save()
        serializer = CartItemSerializer(cart_item)
        # total = float(product.price) * float(quantity)
        # cart.total = total
        # cart.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_serializer_class(self):
        if self.request.method == "GET":
            return OrderCartSerializer
        return CartItemSerializer


class CartItemDetailApiView(RetrieveAPIView, UpdateAPIView, DestroyAPIView):
    serializer_class = CartItemSerializer
    queryset = OrderCartItems.objects.all()

    def retrieve(self, request, *args, **kwargs):
        cart_item = self.get_object()
        if cart_item.order_cart.user != request.user:
            raise PermissionDenied("Sorry this cart not belong to you")
        serializer = self.get_serializer(cart_item)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        cart_item = self.get_object()
        product = get_object_or_404(Product, pk=request.data["product"])

        if cart_item.order_cart.user != request.user:
            raise PermissionDenied("Sorry this cart not belong to you")

        try:
            quantity = int(request.data["quantity"])
        except Exception as e:
            raise ValidationError("Please, input valid quantity")

        if quantity > product.stock_items:
            raise NotAcceptable("Your order quantity more than the product have")

        serializer = CartItemUpdateSerializer(cart_item, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        cart_item = self.get_object()
        if cart_item.order_cart.user != request.user:
            raise PermissionDenied("Sorry this cart not belong to you")
        cart_item.delete()

        return Response(
            {"detail": _("your item has been deleted.")},
            status=status.HTTP_200_OK,
        )