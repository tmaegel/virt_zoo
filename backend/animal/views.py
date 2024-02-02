from rest_framework import viewsets

from animal.models import Animal, AnimalSerializer


class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    pagination_class = None
