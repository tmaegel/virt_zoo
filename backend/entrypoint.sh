#!/bin/sh

python manage.py migrate

exec gunicorn -w 4 --threads 2 -b 0.0.0.0:8000 --access-logfile - app.wsgi
