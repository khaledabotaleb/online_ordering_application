from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from user.models import User


class RegisterUserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    email = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    password = serializers.CharField()
    mobile = serializers.CharField(required=False)
    dob = serializers.DateField(required=False)


    class Meta:
        # These fields are only editable (not displayed) and have to be a part of 'fields' tuple
        extra_kwargs = {"password": {"write_only": True, "min_length": 8}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data.get("password"))
        user.save()
        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["first_name"] = user.first_name
        token["user_id"] = str(user.id)
        return token

    def validate(self, attrs):
        username = attrs.get("email")
        try:
            user = User.objects.get(email=username)
            attrs["email"] = user.email
        except User.DoesNotExist:
            pass
        data = super(MyTokenObtainPairSerializer, self).validate(attrs)
        return data
