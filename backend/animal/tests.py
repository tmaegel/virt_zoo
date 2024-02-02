import json

from django.test import TestCase
from django.urls import reverse
from rest_framework import status
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
            extinct_since=65000000,
        )
        Animal.objects.create(
            name="Mammut",
            weight=15000,
            capability="Große Stoßzähne",
            extinct_since=65000000,
        )

    def test_animal_list(self):
        """List request"""
        res = self.client.get(
            reverse("animal-list"),
        )
        self.assertEqual(
            len(json.loads(res.content)),
            2,
        )

    def test_animal_get(self):
        """Get request"""
        res = self.client.get(
            reverse("animal-detail", args=[1]),
        )
        self.assertEqual(
            json.loads(res.content)["name"],
            "Säbelzahntiger",
        )

    def test_animal_post(self):
        """Create request"""
        self.client.post(
            reverse("animal-list"),
            {
                "name": "T-Rex",
                "weight": 18000,
                "capability": "Scharfe Zähne",
                "extinct_since": 8000000,
            },
            content_type="application/json",
        )
        self.assertEqual(
            len(Animal.objects.all()),
            3,
        )

    def test_animal_post_missing_name(self):
        """Name attribute is mandatory on post"""
        res = self.client.post(
            reverse("animal-list"),
            {
                "weight": 18000,
                "capability": "Scharfe Zähne",
                "extinct_since": 8000000,
            },
            content_type="application/json",
        )
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_animal_post_missing_weight(self):
        """Weight attribute is mandatory on post"""
        res = self.client.post(
            reverse("animal-list"),
            {
                "name": "T-Rex",
                "capability": "Scharfe Zähne",
                "extinct_since": 8000000,
            },
            content_type="application/json",
        )
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_animal_post_missing_capability(self):
        """Capability attribute is mandatory on post"""
        res = self.client.post(
            reverse("animal-list"),
            {
                "name": "T-Rex",
                "weight": 18000,
                "extinct_since": 8000000,
            },
            content_type="application/json",
        )
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_animal_post_missing_extinct_since(self):
        """Extinct since attribute is mandatory on post"""
        res = self.client.post(
            reverse("animal-list"),
            {
                "name": "T-Rex",
                "weight": 18000,
                "capability": "Scharfe Zähne",
            },
            content_type="application/json",
        )
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_animal_put(self):
        """Update request"""
        self.client.put(
            reverse("animal-detail", args=[1]),
            {
                "name": "Säbelzahnkatze",
                "weight": 350,
                "capability": "Große Zähne",
                "extinct_since": 65000000,
            },
            content_type="application/json",
        )
        self.assertEqual(
            Animal.objects.get(id=1).name,
            "Säbelzahnkatze",
        )

    def test_animal_put_missing_name(self):
        """Name attribute is mandatory on put"""
        res = self.client.put(
            reverse("animal-detail", args=[1]),
            {
                "weight": 350,
                "capability": "Große Zähne",
                "extinct_since": 65000000,
            },
            content_type="application/json",
        )
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_animal_put_missing_weight(self):
        """Weight attribute is mandatory on put"""
        res = self.client.put(
            reverse("animal-detail", args=[1]),
            {
                "name": "Säbelzahnkatze",
                "capability": "Große Zähne",
                "extinct_since": 65000000,
            },
            content_type="application/json",
        )
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_animal_put_missing_capability(self):
        """Capability attribute is mandatory on put"""
        res = self.client.put(
            reverse("animal-detail", args=[1]),
            {
                "name": "Säbelzahnkatze",
                "weight": 350,
                "extinct_since": 65000000,
            },
            content_type="application/json",
        )
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_animal_put_missing_extinct_since(self):
        """Extinct ince attribute is mandatory on put"""
        res = self.client.put(
            reverse("animal-detail", args=[1]),
            {
                "name": "Säbelzahnkatze",
                "weight": 350,
                "capability": "Große Zähne",
            },
            content_type="application/json",
        )
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_animal_patch(self):
        """Partial update request"""
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
        """Delete request"""
        self.client.delete(
            reverse("animal-detail", args=[1]),
        )
        self.assertEqual(
            len(Animal.objects.all()),
            1,
        )
