from django.test import TestCase
from django.urls import reverse

from product.models import Product
from user.models import User


# Create your tests here.
class BaseTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user_dict = {
            "username": "test@username.com",
            "email": "test@mail.com",
            "first_name": "Test",
            "last_name": "end-user",
            "password": "12345678",
            "mobile": "+2011772310",
            "dob": "2022-10-06"
        }
        cls.product_dict = {
            "name": "test product",
            "description": "test description",
            "price": 20,
            "stock_items": 10
        }

    @classmethod
    def add_product(cls, product_dict, user) -> Product:
        cls.product = Product.objects.create(**product_dict, user=user)


class RegisterTest(BaseTest):
    def test_200_ok(self) -> None:
        response = self.client.post(reverse("user:register"), self.user_dict)
        user = User.objects.get(email="test@mail.com")
        assert response.status_code == 201
        assert User.objects.count() == 1
        assert user.email == "test@mail.com"

    def test_400_wrong_data(self) -> None:
        del self.user_dict["password"]
        response = self.client.post(reverse("user:register"), self.user_dict)
        assert response.status_code == 400
        assert User.objects.count() == 0
