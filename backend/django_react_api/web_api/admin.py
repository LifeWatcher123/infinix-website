from django.contrib import admin

from blog.models import (
    GameBlogPage, GameIndexPage
)
from home.models import (
    AlbumItems
)
from .models import (
    Game, BlogAuthor

)

admin.site.register(Game)
admin.site.register(GameBlogPage)
admin.site.register(GameIndexPage)
admin.site.register(BlogAuthor)
admin.site.register(AlbumItems)
