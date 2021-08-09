from django.contrib import admin

# Register your models here.
from .models import Game, Section, Image

admin.site.register(Game)
admin.site.register(Section)
admin.site.register(Image)
