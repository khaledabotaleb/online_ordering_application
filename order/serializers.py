from rest_framework import serializers

from order.models import OrderCartItems, OrderCart
from product.serializers import ReadProductSerialier


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderCartItems
        fields = ["order_cart", "product", "quantity"]


class CartItemUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderCartItems
        fields = ["product", "quantity"]


class OrderItemsSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    product = ReadProductSerialier()
    quantity = serializers.IntegerField()
    item_cost = serializers.FloatField(read_only=True)


class OrderCartSerializer(serializers.Serializer):
    cart_items = OrderItemsSerializer(many=True)
    total_price = serializers.FloatField()

