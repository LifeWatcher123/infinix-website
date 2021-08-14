from django.contrib import admin

# Register your models here.
from .models import (
    Game, GameBlogPage, GameIndexPage, BlogAuthor,

)

admin.site.register(Game)
admin.site.register(GameBlogPage)
admin.site.register(GameIndexPage)
admin.site.register(BlogAuthor)
