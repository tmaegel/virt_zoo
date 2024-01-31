from django.db import models
from rest_framework import serializers


class Animal(models.Model):
    name = models.CharField(max_length=128)
    weight = models.FloatField()
    capability = models.CharField(max_length=128)
    extinct_since = models.DateField()


class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = "__all__"
