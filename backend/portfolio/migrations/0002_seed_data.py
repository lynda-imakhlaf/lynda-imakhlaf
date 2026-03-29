import json
import os
from django.db import migrations


FIXTURE = os.path.join(os.path.dirname(__file__), '..', 'fixtures', 'initial_data.json')


def load_fixture(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Skill   = apps.get_model('portfolio', 'Skill')

    if Project.objects.exists() or Skill.objects.exists():
        return  # already seeded, skip

    with open(FIXTURE, encoding='utf-8') as f:
        data = json.load(f)

    for item in data:
        if item['model'] == 'portfolio.project':
            Project.objects.create(pk=item['pk'], **item['fields'])
        elif item['model'] == 'portfolio.skill':
            Skill.objects.create(pk=item['pk'], **item['fields'])


def unload_fixture(apps, schema_editor):
    apps.get_model('portfolio', 'Project').objects.all().delete()
    apps.get_model('portfolio', 'Skill').objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(load_fixture, unload_fixture),
    ]
