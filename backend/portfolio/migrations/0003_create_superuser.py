from django.db import migrations


def create_superuser(apps, schema_editor):
    from django.contrib.auth import get_user_model
    User = get_user_model()
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser(
            username='admin',
            email='admin@portfolio.com',
            password='1234@123',
        )


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0002_seed_data'),
    ]

    operations = [
        migrations.RunPython(create_superuser, migrations.RunPython.noop),
    ]
