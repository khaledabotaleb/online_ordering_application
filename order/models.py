from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.functional import cached_property

from user.models import User


# Create your models here.
class OrderCart(models.Model):
    user = models.OneToOneField(
        "user.User", on_delete=models.CASCADE, related_name="user_cart"
    )

    @property
    def total_price(self):
        from django.db.models import Sum, F

        return self.cart_items.aggregate(total_price=Sum(F("quantity") * F("product__price")))[
            "total_price"
        ]


class OrderCartItems(models.Model):
    order_cart = models.ForeignKey(
        OrderCart, on_delete=models.CASCADE, related_name="cart_items"
    )
    product = models.ForeignKey(
        "product.Product", on_delete=models.CASCADE, related_name="product_cart_items"
    )
    quantity = models.IntegerField(default=1)

    @cached_property
    def item_cost(self):
        return self.quantity * self.product.price


@receiver(post_save, sender=User)
def create_user_cart(sender, created, instance, *args, **kwargs):
    if created:
        OrderCart.objects.create(user=instance)

