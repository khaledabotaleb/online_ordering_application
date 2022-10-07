from django.urls import path

from user.views import MyTokenObtainPairView, RegisterApi

app_name = "user"

urlpatterns = [
    path("auth/login/", MyTokenObtainPairView.as_view(), name="login"),
    path("register/", RegisterApi.as_view(), name="register")
]