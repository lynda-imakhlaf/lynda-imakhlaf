from django.db import migrations


PROJECTS = [
    {
        'title': 'E-Commerce Platform',
        'description': "Boutique complète avec React, Django, Stripe et gestion d'inventaire en temps réel.",
        'category': 'web',
        'tags': ['React', 'Django', 'PostgreSQL', 'Stripe', 'Docker'],
        'accent_color': '#A855F7',
        'year': 2024,
        'is_featured': True,
        'order': 1,
    },
    {
        'title': 'Système ERP',
        'description': 'RH, inventaire, comptabilité, reporting. Architecture modulaire pour une entreprise de fabrication.',
        'category': 'web',
        'tags': ['React', 'Django', 'PostgreSQL', 'Charts.js'],
        'accent_color': '#38BDF8',
        'year': 2023,
        'is_featured': True,
        'order': 2,
    },
    {
        'title': 'Jeu Unity 3D',
        'description': 'Monde immersif Unity avec personnages Blender, shaders custom et physique avancée.',
        'category': 'game',
        'tags': ['Unity', 'C#', 'Blender', 'Animation'],
        'accent_color': '#FB923C',
        'year': 2023,
        'is_featured': True,
        'order': 3,
    },
    {
        'title': '3D Product Viewer',
        'description': 'Visualiseur Three.js interactif : matériaux, éclairage HDR, rotations — dans le navigateur.',
        'category': '3d',
        'tags': ['Three.js', 'React', 'WebGL', 'GLTF'],
        'accent_color': '#F472B6',
        'year': 2024,
        'is_featured': False,
        'order': 4,
    },
    {
        'title': 'App Immobilière',
        'description': 'Filtres avancés, carte Leaflet, visites virtuelles, dashboard admin complet.',
        'category': 'web',
        'tags': ['React', 'Django', 'Leaflet', 'PostgreSQL'],
        'accent_color': '#4ADE80',
        'year': 2024,
        'is_featured': True,
        'order': 5,
    },
    {
        'title': 'Pack Personnages 3D',
        'description': 'Personnages riggés et animés dans Blender, exportés pour Unity et Unreal Engine.',
        'category': '3d',
        'tags': ['Blender', 'Rigging', 'Animation', 'FBX'],
        'accent_color': '#FBBF24',
        'year': 2023,
        'is_featured': False,
        'order': 6,
    },
]

SKILLS = [
    # Frontend
    {'name': 'React',       'category': 'frontend', 'level': 95, 'color': '#38BDF8', 'order': 1},
    {'name': 'TypeScript',  'category': 'frontend', 'level': 88, 'color': '#38BDF8', 'order': 2},
    {'name': 'Three.js',    'category': 'frontend', 'level': 80, 'color': '#38BDF8', 'order': 3},
    {'name': 'JavaScript',  'category': 'frontend', 'level': 95, 'color': '#38BDF8', 'order': 4},
    {'name': 'Vite',        'category': 'frontend', 'level': 85, 'color': '#38BDF8', 'order': 5},
    # Backend
    {'name': 'Django / DRF','category': 'backend',  'level': 92, 'color': '#4ADE80', 'order': 1},
    {'name': 'Python',      'category': 'backend',  'level': 90, 'color': '#4ADE80', 'order': 2},
    {'name': 'MySQL / PG',  'category': 'backend',  'level': 86, 'color': '#4ADE80', 'order': 3},
    {'name': 'REST APIs',   'category': 'backend',  'level': 93, 'color': '#4ADE80', 'order': 4},
    {'name': 'Docker',      'category': 'backend',  'level': 78, 'color': '#4ADE80', 'order': 5},
    # Creative
    {'name': 'Blender',     'category': 'creative', 'level': 85, 'color': '#FB923C', 'order': 1},
    {'name': 'Unity',       'category': 'creative', 'level': 82, 'color': '#FB923C', 'order': 2},
    {'name': 'C#',          'category': 'creative', 'level': 78, 'color': '#FB923C', 'order': 3},
    {'name': 'Animation',   'category': 'creative', 'level': 80, 'color': '#FB923C', 'order': 4},
    {'name': 'C++',         'category': 'creative', 'level': 70, 'color': '#FB923C', 'order': 5},
    # Tools
    {'name': 'Git / GitHub','category': 'tools',    'level': 93, 'color': '#F472B6', 'order': 1},
    {'name': 'Figma',       'category': 'tools',    'level': 82, 'color': '#F472B6', 'order': 2},
    {'name': 'Postman',     'category': 'tools',    'level': 88, 'color': '#F472B6', 'order': 3},
    {'name': 'Linux',       'category': 'tools',    'level': 80, 'color': '#F472B6', 'order': 4},
    {'name': 'CI/CD',       'category': 'tools',    'level': 72, 'color': '#F472B6', 'order': 5},
]


def seed(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Skill = apps.get_model('portfolio', 'Skill')

    # Only seed if tables are empty
    if not Project.objects.exists():
        for p in PROJECTS:
            Project.objects.create(**p)

    if not Skill.objects.exists():
        for s in SKILLS:
            Skill.objects.create(**s)


def unseed(apps, schema_editor):
    Project = apps.get_model('portfolio', 'Project')
    Skill = apps.get_model('portfolio', 'Skill')
    Project.objects.all().delete()
    Skill.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed, unseed),
    ]
