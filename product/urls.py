from django.urls import path

from product.views import ProductApiView, ProductDetailApiView

app_name = "products"

urlpatterns = [
    path("", ProductApiView.as_view(), name="create-list-product"),
    path("<int:pk>/",  ProductDetailApiView.as_view(), name="get-update-delete-product")

]