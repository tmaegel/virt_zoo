import json
from datetime import date

from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from animal.models import Animal


class AnimalApiTest(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.client = APIClient()

    def setUp(self):
        Animal.objects.create(
            name="Säbelzahntiger",
            weight=350.0,
            capability="Große Zähne",
            extinct_since=date(1900, 1, 1),
        )
        Animal.objects.create(
            name="Mammut",
            weight=15000,
            capability="Große Stoßzähne",
            extinct_since=date(1500, 1, 1),
        )

    def test_animal_list(self):
        res = self.client.get(
            reverse("animal-list"),
        )
        self.assertEqual(
            len(json.loads(res.content)),
            2,
        )

    def test_animal_get(self):
        res = self.client.get(
            reverse("animal-detail", args=[1]),
        )
        self.assertEqual(
            json.loads(res.content)["name"],
            "Säbelzahntiger",
        )

    def test_animal_post(self):
        self.client.post(
            reverse("animal-list"),
            {
                "name": "T-Rex",
                "weight": 18000,
                "capability": "Scharfe Zähne",
                "extinct_since": date(1500, 1, 1),
            },
            content_type="application/json",
        )
        self.assertEqual(
            len(Animal.objects.all()),
            3,
        )

    def test_animal_patch(self):
        self.client.patch(
            reverse("animal-detail", args=[1]),
            {
                "name": "Säbelzahnkatze",
            },
            content_type="application/json",
        )
        self.assertEqual(
            Animal.objects.get(id=1).name,
            "Säbelzahnkatze",
        )

    def test_animal_delete(self):
        self.client.delete(
            reverse("animal-detail", args=[1]),
        )
        self.assertEqual(
            len(Animal.objects.all()),
            1,
        )
