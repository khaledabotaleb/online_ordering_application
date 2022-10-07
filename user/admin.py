from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from user.forms import UserChangeForm, UserCreationForm
from user.models import User

# Register your models here.
class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm
    list_display = ("email", )
    ordering = ()
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "email",
                    "password",
                    "mobile",
                    "first_name",
                    "last_name",
                    "dob",
                    "avatar",
                    "is_active"
                )
            },
        ),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password",
                    "mobile",
                    "first_name",
                    "last_name",
                    "dob",
                    "avatar",
                    "is_active",
                ),
            },
        ),
    )


admin.site.register(User, UserAdmin)
