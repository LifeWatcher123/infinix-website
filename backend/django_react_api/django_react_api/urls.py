"""django_react_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/

Wagtail CMS has its own URL endpoints defined in `django_rest_framework.api`.
Furthermore, Wagtail provides the functionality of the `views.py` for the models,
so it was deleted. For more information, see:
https://docs.wagtail.io/en/stable/advanced_topics/api/v2/configuration.html#configure-endpoints
https://docs.wagtail.io/en/stable/advanced_topics/add_to_django_project.html
"""
from django.contrib import admin
from django.urls import include, path, re_path
from django.conf.urls.static import static
from django.conf import settings

from wagtail.core import urls as wagtail_urls
from wagtail.admin import urls as wagtailadmin_urls
from wagtail.documents import urls as wagtaildocs_urls

from .api import api_router

urlpatterns = [
    path('admin/', admin.site.urls),

    # Wagtail Admin and other links
    path('wagtail-cms/', include(wagtailadmin_urls)),
    path('documents/', include(wagtaildocs_urls)),

    # Wagtail Headless CMS API
    path('wagtail-api/', api_router.urls),

    # Database API links. [deleted] See above docstring
    #re_path(r'^api/games/$', views.games_list),
    #re_path(r'^api/games/([0-9])$', views.game_detail),


    # Ensure that the api_router line appears above the default Wagtail page serving route
    re_path(r'^', include(wagtail_urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
