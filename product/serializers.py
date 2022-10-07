from rest_framework import serializers

from product.models import Product


class ProductSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )

    class Meta:
        model = Product
        fields = "__all__"


class ReadProductSerialier(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    # description = serializers.CharField()
    image = serializers.ImageField()
    stock_items = serializers.IntegerField()
    # create_at = serializers.DateTimeField()