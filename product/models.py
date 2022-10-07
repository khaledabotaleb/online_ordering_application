from django.db import models
from django.utils.translation import gettext_lazy as _


def upload_product_image(instance, filename):
    return "product/{0}/{1}".format(instance.name, filename)


# Create your models here.
class Product(models.Model):
    user = models.ForeignKey("user.User", on_delete=models.CASCADE, related_name="user_products")
    name = models.CharField(max_length=150, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    image = models.ImageField(_("image"), null=True, upload_to=upload_product_image)
    price = models.FloatField(null=False, blank=False)
    stock_items = models.IntegerField(default=1)
    create_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id',)

    def __str__(self):
        return self.name