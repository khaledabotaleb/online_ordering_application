from django.urls import path

from order.views import CartItemAPIView, CartItemDetailApiView, ListProductsApiView

app_name = "order_purchase"


urlpatterns = [
    path("products/", ListProductsApiView.as_view(), name="products"),
    path("cart/", CartItemAPIView.as_view(), name="cart"),
    path("cart-item/<int:pk>/", CartItemDetailApiView.as_view(), name="cart-item"),
]