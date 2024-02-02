compile:
	pip-compile
	pip-compile requirements_dev.in

install_dev:
	pip install -r requirements_dev.txt -r requirements.txt

run_dev:
	python manage.py runserver

migrate:
	python manage.py migrate

superuser: migrate
	python manage.py createsuperuser --username admin

test:
	coverage run --source='.' manage.py test
	coverage report
