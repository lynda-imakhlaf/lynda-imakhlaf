from django.contrib import admin
from .models import Project, Skill, ContactMessage


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'year', 'is_featured', 'order']
    list_filter = ['category', 'is_featured', 'year']
    list_editable = ['order', 'is_featured']
    search_fields = ['title', 'description']
    ordering = ['order', '-year']


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'level', 'order']
    list_filter = ['category']
    list_editable = ['order', 'level']
    ordering = ['category', 'order']


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    list_editable = ['is_read']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']
    search_fields = ['name', 'email', 'subject']
    ordering = ['-created_at']
