from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField


def upload_avatar(instance, filename):
    return "users/{0}/{1}".format(instance.id, filename)


# Create your models here.
class User(AbstractUser):
    username = models.CharField(_("username"), max_length=150, unique=False, null=True, blank=True)
    email = models.EmailField(
        _("email address"),
        max_length=125,
        unique=True,
        error_messages={
            "unique": _("A user with that email already exists."),
        },
    )
    mobile = PhoneNumberField(blank=True, null=True)
    avatar = models.FileField(_("avatar"), null=True, upload_to=upload_avatar)
    dob = models.DateField(blank=True, null=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        ordering = ["-id"]
        verbose_name = _("User")
        verbose_name_plural = _("User")

