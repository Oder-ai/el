#!/bin/sh

python manage.py makemigrations

python manage.py migrate

python manage.py collectstatic --no-input

#python manage.py createsuperuser('admin', 'admin@example.com', 'pass')

python manage.py runserver 0.0.0.0:8000