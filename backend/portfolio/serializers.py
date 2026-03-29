from rest_framework import serializers
from .models import Project, Skill, ContactMessage


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'category', 'tags',
            'thumbnail', 'demo_url', 'github_url', 'accent_color',
            'year', 'is_featured', 'order',
        ]
        read_only_fields = ['id']


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'level', 'color', 'icon', 'order']
        read_only_fields = ['id']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError('Message must be at least 10 characters.')
        return value
