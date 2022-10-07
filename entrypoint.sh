#!/bin/sh

echo "Waiting for Database..."

#
python manage.py migrate

DJANGO_SUPERUSER_PASSWORD=12345678 \
DJANGO_SUPERUSER_USERNAME=admin@mail.com \
DJANGO_SUPERUSER_EMAIL=admin@mail.com  \
DJANGO_SUPERUSER_FIRST_NAME=admin \
DJANGO_SUPERUSER_LAST_NAME=User \
python manage.py createsuperuser --no-input || true

exec "$@"