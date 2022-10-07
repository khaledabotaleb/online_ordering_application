from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from product.models import Product
from user.models import User
from user.tests import BaseTest
import pdb


# Create your tests here.
class ProductTest(BaseTest):
    def setUp(self) -> None:
        super().setUp()
        self.client = APIClient()
        self.user = User.objects.create_user(**self.user_dict)

    def test_add_product_200_ok(self):
        self.client.force_authenticate(self.user)
        response = self.client.post(reverse("products:create-list-product"), self.product_dict)
        product = Product.objects.get(name="test product")
        assert response.status_code == 201
        assert Product.objects.count() == 1
        assert product.name == "test product"

    def test_401_not_authorized_user(self) -> None:
        response = self.client.post(reverse("products:create-list-product"), self.product_dict)
        assert response.status_code == 401
        assert Product.objects.count() == 0

    def test_add_product_wrong_data_400_error(self):
        del self.product_dict["name"]
        self.client.force_authenticate(self.user)
        response = self.client.post(reverse("products:create-list-product"), self.product_dict)
        assert response.status_code == 400
        assert Product.objects.count() == 0

    def test_list_user_products(self, ):
        self.client.force_authenticate(self.user)
        self.add_product(self.product_dict, self.user)
        response = self.client.get(reverse("products:create-list-product"))
        assert response.status_code == 200
        assert response.json()['count'] == Product.objects.count()
        assert response.json()["results"][0].get("name") == "test product"

    def test_get_product_detail(self):
        self.client.force_authenticate(self.user)
        self.add_product(self.product_dict, self.user)
        response = self.client.get(reverse("products:get-update-delete-product", args=(str(self.product.id))))
        assert response.status_code == 200
        assert response.data.get("name") == "test product"

    def test_update_product_by_id(self):
        self.client.force_authenticate(self.user)
        self.add_product(self.product_dict, self.user)
        response = self.client.patch(reverse("products:get-update-delete-product", args=(str(self.product.id))),
                                     {"name": "update product name"})
        assert response.status_code == 200
        assert response.data.get("name") == "update product name"

    def test_delete_product_200_ok(self):
        self.client.force_authenticate(self.user)
        self.add_product(self.product_dict, self.user)
        response = self.client.patch(reverse("products:get-update-delete-product", args=(str(self.product.id))),)
        assert response.status_code == 200
