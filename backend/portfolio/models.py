from django.db import models


class Project(models.Model):
    CATEGORY_CHOICES = [
        ('web', 'Web App'),
        ('3d', '3D / WebGL'),
        ('game', 'Game Dev'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='web')
    tags = models.JSONField(default=list)
    thumbnail = models.ImageField(upload_to='projects/', blank=True, null=True)
    demo_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    accent_color = models.CharField(max_length=20, default='#a855f7')
    year = models.PositiveSmallIntegerField(default=2024)
    is_featured = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-year', '-created_at']

    def __str__(self):
        return self.title


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('creative', 'Creative'),
        ('tools', 'Tools'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    level = models.PositiveSmallIntegerField(default=80, help_text='0-100')
    color = models.CharField(max_length=20, default='#a855f7')
    icon = models.CharField(max_length=100, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['category', 'order']

    def __str__(self):
        return f'{self.name} ({self.category})'


class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=300)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'[{self.created_at.strftime("%Y-%m-%d")}] {self.name} — {self.subject}'
