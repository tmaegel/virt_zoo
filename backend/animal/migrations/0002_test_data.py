from django.db import migrations, models

animals = [
    {
        "name": "Brachiosaurus",
        "weight": 37000,
        "capability": "Langhals",
        "extinct_since": 145000000,
    },
    {
        "name": "Saurischia",
        "weight": 35000,
        "capability": "Zweibeinig",
        "extinct_since": 65000000,
    },
    {
        "name": "Herrerasauridae",
        "weight": 35000,
        "capability": "Zweibeinig",
        "extinct_since": 235000000,
    },
    {
        "name": "Theropoda",
        "weight": 8000,
        "capability": "Zweibeinig",
        "extinct_since": 66000000,
    },
    {
        "name": "Giganotosaurus",
        "weight": 7000,
        "capability": "Zweibeinig",
        "extinct_since": 96200000,
    },
    {
        "name": "Sauropodomorpha",
        "weight": 80000,
        "capability": "Langhals",
        "extinct_since": 66000000,
    },
    {
        "name": "Titanosaurier",
        "weight": 5000,
        "capability": "Hautknochenplatten",
        "extinct_since": 66000000,
    },
    {
        "name": "Heterodontosauridae",
        "weight": 300,
        "capability": "Verschiedenartigen Zähnen",
        "extinct_since": 112900000,
    },
    {
        "name": "Ceratopsia",
        "weight": 3000,
        "capability": "Nackenschild",
        "extinct_since": 66000000,
    },
    {
        "name": "Pachycephalosauria",
        "weight": 2500,
        "capability": "Verdicktes Schädeldach",
        "extinct_since": 66000000,
    },
    {
        "name": "Ornithopoda",
        "weight": 7000,
        "capability": "Rückenkamm",
        "extinct_since": 66000000,
    },
]


def insert_animals(apps, schema_editor):
    model = apps.get_model("animal", "Animal")
    for a in animals:
        model.objects.create(**a)


class Migration(migrations.Migration):
    dependencies = [("animal", "0001_initial")]

    operations = [
        migrations.RunPython(insert_animals),
    ]
