from django.test import TestCase
from django.urls import reverse

from order.models import OrderCart, OrderCartItems
from product.models import Product
from product.tests import ProductTest
from user.models import User
from user.tests import BaseTest
from rest_framework.test import APIClient


# Create your tests here.
class OrderTest(BaseTest):
    def setUp(self) -> None:
        super().setUp()
        self.client = APIClient()
        del self.user_dict["email"]
        self.owner_user = User.objects.create_user(email="owneruser@mail.com", **self.user_dict)
        self.add_product(self.product_dict, self.owner_user)
        self.order_user = User.objects.create_user(email="orderuser@mail.com", **self.user_dict)
        self.user_cart, created = OrderCart.objects.get_or_create(user=self.order_user)

    def test_list_of_products_for_other_users_ok_200(self):
        self.client.force_authenticate(self.order_user)
        response = self.client.get(reverse("order_purchase:products"))
        assert response.status_code == 200
        assert len(response.data) == Product.objects.count()

    def test_get_list_of_products_for_owner_user_get_empty_list(self):
        self.client.force_authenticate(self.owner_user)
        response = self.client.get(reverse("order_purchase:products"))
        assert response.status_code == 200
        assert len(response.data) == 0

    def test_add_order_in_user_cart_test_ok(self):
        self.client.force_authenticate(self.order_user)
        order_data = {"product": self.product.id, "quantity": 2}
        response = self.client.post(reverse("order_purchase:cart"), order_data)
        cart = OrderCart.objects.get(user=self.order_user)
        assert response.status_code == 201
        assert response.data.get("order_cart") == cart.id
        assert OrderCartItems.objects.count() == 1

    def test_owner_user_can_not_purchase_his_order_return_403(self):
        self.client.force_authenticate(self.owner_user)
        order_data = {"product": self.product.id, "quantity": 2}
        response = self.client.post(reverse("order_purchase:cart"), order_data)
        assert response.status_code == 403
        assert response.data["detail"] == "You Can not purchase your Product"
        assert OrderCartItems.objects.count() == 0

    def test_that_the_user_can_not_add_the_same_product_twice_to_cart_return_406_not_acceptable(self):
        self.test_add_order_in_user_cart_test_ok()
        self.client.force_authenticate(self.order_user)
        order_data = {"product": self.product.id, "quantity": 5}
        response = self.client.post(reverse("order_purchase:cart"), order_data)
        assert response.status_code == 406
        assert response.data["detail"] == "You already have this item in your cart"
        assert OrderCartItems.objects.count() == 1

    def test_that_the_quantity_more_that_the_product_items_stock_return_406(self):
        self.client.force_authenticate(self.order_user)
        order_data = {"product": self.product.id, "quantity": 12}
        response = self.client.post(reverse("order_purchase:cart"), order_data)
        assert response.status_code == 406
        assert response.data["detail"] == "You order quantity more than that product have"
        assert OrderCartItems.objects.count() == 0

    def test_order_wrong_data_return_400(self):
        self.client.force_authenticate(self.order_user)
        order_data = {"product": self.product.id}
        response = self.client.post(reverse("order_purchase:cart"), order_data)
        assert response.status_code == 400
        assert response.data[0] == "Please Enter Your Quantity"

    def test_get_purchase_products_data_ok_200(self):
        self.test_add_order_in_user_cart_test_ok()
        self.client.force_authenticate(self.order_user)
        response = self.client.get(reverse("order_purchase:cart"))
        assert response.status_code == 200
        assert len(response.data) == 2
        assert response.data.get("total_price") == self.user_cart.total_price

    def test_get_purchase_product_data_by_id_ok_200(self):
        self.test_add_order_in_user_cart_test_ok()
        self.client.force_authenticate(self.order_user)
        cart_item = OrderCartItems.objects.filter(order_cart=self.user_cart).first()
        response = self.client.get(reverse("order_purchase:cart-item", args=(str(cart_item.id))))
        assert response.status_code == 200
        assert response.data.get("product") == self.product.id

    def test_update_purchase_product_data_by_id_ok_200(self):
        self.test_add_order_in_user_cart_test_ok()
        self.client.force_authenticate(self.order_user)
        cart_item = OrderCartItems.objects.filter(order_cart=self.user_cart).first()
        new_order_data = {"product": self.product.id, "quantity": 3}
        response = self.client.patch(reverse("order_purchase:cart-item", args=(str(cart_item.id))), new_order_data)
        assert response.status_code == 200

    def test_update_purchase_product_in_cart_not_belong_to_current_user_return_403_permission_denied(self):
        self.test_add_order_in_user_cart_test_ok()
        self.client.force_authenticate(self.owner_user)
        cart_item = OrderCartItems.objects.filter(order_cart=self.user_cart).first()
        new_order_data = {"product": self.product.id, "quantity": 3}
        response = self.client.patch(reverse("order_purchase:cart-item", args=(str(cart_item.id))), new_order_data)
        assert response.status_code == 403
        assert response.data.get("detail") == "Sorry this cart not belong to you"

    def test_update_purchase_product_with_not_valid_quantity_return_400(self):
        self.client.force_authenticate(self.order_user)
        self.test_add_order_in_user_cart_test_ok()
        cart_item = self.user_cart.cart_items.first()
        new_order_data = {"product": self.product.id}
        response = self.client.patch(reverse("order_purchase:cart-item", args=(str(cart_item.id))), new_order_data)
        assert response.status_code == 400
        assert response.data[0] == "Please, input valid quantity"

    def test_update_purchase_product_with_quantity_greater_that_product_items_not_accepted_return_406(self):
        self.client.force_authenticate(self.order_user)
        self.test_add_order_in_user_cart_test_ok()
        cart_item = self.user_cart.cart_items.first()
        new_order_data = {"product": self.product.id, "quantity": 15}
        response = self.client.patch(reverse("order_purchase:cart-item", args=(str(cart_item.id))), new_order_data)
        assert response.status_code == 406
        assert response.data["detail"] == "Your order quantity more than the product have"

    def test_delete_purchase_product_in_cart_not_belong_to_current_user_return_403_permission_denied(self):
        self.test_add_order_in_user_cart_test_ok()
        self.client.force_authenticate(self.owner_user)
        cart_item = self.user_cart.cart_items.first()
        response = self.client.delete(reverse("order_purchase:cart-item", args=(str(cart_item.id))))
        assert response.status_code == 403
        assert response.data.get("detail") == "Sorry this cart not belong to you"

    def test_delete_purchase_product_item_from_cart_success_return_200_ok(self):
        self.test_add_order_in_user_cart_test_ok()
        self.client.force_authenticate(self.order_user)
        cart_item = self.user_cart.cart_items.first()
        response = self.client.delete(reverse("order_purchase:cart-item", args=(str(cart_item.id))))
        assert response.status_code == 200
        assert OrderCartItems.objects.count() == 0


