from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, SkillViewSet, contact_message

router = DefaultRouter()
router.register('projects', ProjectViewSet, basename='project')
router.register('skills', SkillViewSet, basename='skill')

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', contact_message, name='contact'),
]
