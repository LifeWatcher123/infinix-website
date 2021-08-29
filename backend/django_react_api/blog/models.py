"""
Django Models representing the Blog Pages' data.

Some items make sense to have a form of ordering,
so they extend the Orderable class provided by Wagtail.
For more information about this, see:
https://pypi.org/project/django-orderable/

Some ForeignKey implementations is replaced by ParentalKey in conjunction with InlinePanel,
as this implements Wagtail's way of creating "clusters" of related objects.
For more information, please see:
https://docs.wagtail.io/en/stable/reference/pages/panels.html#inline-panels
"""

from django.db import models
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

# Wagtail-specific model fields and admin editing integration dependencies.
from modelcluster.fields import ParentalKey
from wagtail.core.models import Page, Orderable
from wagtail.core.fields import StreamField, RichTextField
from wagtail.api import APIField
from wagtail.core import blocks
from wagtail.admin.edit_handlers import (
    FieldPanel, MultiFieldPanel, StreamFieldPanel, InlinePanel
)
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.images.blocks import ImageChooserBlock
from wagtail.images.api.fields import ImageRenditionField
from wagtail.snippets.edit_handlers import SnippetChooserPanel
# Import `web_api`'s image serializer, as lazy importing doesn't work
from web_api.fields import *


class GameBlogPageCarouselImages(Orderable):
    """Between 1 to 4 images for the game pages' carousels."""

    page = ParentalKey('blog.GameBlogPage',
                       related_name="game_carousel_images")
    carousel_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    panels = [
        ImageChooserPanel("carousel_image")
    ]

    api_fields = [
        APIField("carousel_image"),
    ]


class GamesBlogAuthorOrderable(Orderable):
    """
    This should replace the functionality of the `views.py` and `serializers.py`.
    This allows us to select one or more blog and their authors from the admin's Snippets.

    For information about the custom serializers used, see:
    https://docs.wagtail.io/en/stable/advanced_topics/api/v2/configuration.html#custom-serialisers
    https://docs.wagtail.io/en/stable/advanced_topics/api/v2/configuration.html#images-in-the-api
    """

    page = ParentalKey('GameBlogPage', related_name="blog_authors")
    author = models.ForeignKey(
        'web_api.BlogAuthor',
        on_delete=models.CASCADE,
    )

    panels = [
        SnippetChooserPanel("author"),
    ]

    @property
    def author_name(self):
        """ Adding property from foreign Author table. """
        return self.author.name

    @property
    def author_website(self):
        """ Adding property from foreign Author table. """
        return self.author.website

    @property
    def author_image(self):
        """ Adding property from foreign Author table. """
        return self.author.image

    api_fields = [
        APIField("author_name"),
        APIField("author_website"),
        # This is using a custom django rest framework serializer. See this class' docstring
        APIField("author_image", serializer=ImageSerializedField()),
        # The below APIField is using a Wagtail-built DRF Serializer that supports
        # custom image rendition sizes. See this class' docstring
        APIField(
            "image",
            serializer=ImageRenditionField(
                'fill-200x250',
                source="author_image"
            )
        ),
    ]


class GameBlogPage(Page):
    """
    Defines the GameBlogPage database model.

    For reference, see:
    https://docs.wagtail.io/en/stable/advanced_topics/api/v2/configuration.html#adding-custom-page-fields
    https://docs.wagtail.io/en/stable/topics/pages.html
    """
    parent_page_type = [
        'blog.GameIndexPage'
    ]

    introduction = models.TextField(
        help_text="Short text shown at the top of the page and" +
        " as a descriptor for the album list linked.")

    game = models.ForeignKey(
        'web_api.Game',
        on_delete=models.PROTECT,
        related_name='sections')

    @property
    def game_title(self):
        """ Used to access the related Game's title property. """
        return self.game.title

    album_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text='Used in the landing page\'s album section. '
        + 'Landscape mode only; horizontal width between 1000px and 3000px.'
    )
    body = StreamField([
        ('heading', blocks.CharBlock(form_classname="full title")),
        ('paragraph', blocks.RichTextBlock()),
        ('image', ImageChooserBlock()),
    ])
    published_date = models.DateTimeField()

    content_panels = Page.content_panels + [
        ImageChooserPanel('album_image'),
        FieldPanel('introduction'),
        MultiFieldPanel(
            [
                InlinePanel("game_carousel_images", label="Carousel Images",
                            min_num=1, max_num=4)
            ],
            heading="Carousel Image(s)"
        ),
        MultiFieldPanel(
            [
                InlinePanel("blog_authors", label="Author",
                            min_num=1, max_num=4)
            ],
            heading="Author(s)"
        ),
        StreamFieldPanel('body'),
    ]
    settings_panels = Page.settings_panels + [
        FieldPanel('game'),
        FieldPanel('published_date'),
    ]

    api_fields = [
        APIField('introduction'),
        APIField('game'),
        APIField("blog_authors"),
        APIField("body"),
        APIField('published_date'),
        APIField('album_image', serializer=ImageSerializedField()),
        APIField('game_carousel_images'),
    ]

    def __str__(self):
        return self.game.title + ': ' + self.title

    class Meta:
        verbose_name = "Game Blog Page"
        verbose_name_plural = "Game Blog Pages"


class GameIndexPage(Page):
    """
    Index page for game pages.

    Pagination is implemented as any other blog index does.
    For more information regarding references, see:
    https://docs.djangoproject.com/en/3.2/topics/pagination/
    https://github.com/wagtail/bakerydemo/blob/master/bakerydemo/breads/models.py
    """
    # Determines what `Page` objects can be included.
    subpage_types = ['GameBlogPage']

    parent_page_type = [
        'home.HomePage'
    ]

    introduction = RichTextField(
        help_text='Text to describe the page')
    image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text='Landscape mode only; horizontal width between 1000px and '
        '3000px.'
    )

    content_panels = Page.content_panels + [
        FieldPanel('introduction', classname="full"),
        ImageChooserPanel('image'),
    ]
    api_fields = [
        APIField('introduction'),
        APIField('image', serializer=ImageSerializedField()),
        APIField('children', serializer=GameBlogPageField())
    ]

    def get_games(self):
        """
        Returns a queryset of GamePage objects that are live, that are direct
        descendants of this index page with most recent first
        """
        return GameBlogPage.objects.live().descendant_of(
            self).order_by('-first_published_at')

    @property
    def children(self):
        """
        Allows child objects (e.g. GamePage objects) to be accessible via the
        emplate. We use this on the HomePage to display child items of featured
        content.
        """
        return self.get_children().specific().live()

    def paginate(self, request, *args):
        """
        Pagination for the index page. We use the `django.core.paginator` as any
        standard Django app would, but the difference here being we have it as a
        method on the model rather than within a view function.
        """
        page = request.GET.get('page')
        paginator = Paginator(self.get_games(), 12)
        try:
            pages = paginator.page(page)
        except PageNotAnInteger:
            pages = paginator.page(1)
        except EmptyPage:
            pages = paginator.page(paginator.num_pages)
        return pages

    def get_context(self, request, *args, **kwargs):
        """
        Returns the above to the get_context method that is used to populate the
        template.
        """
        context = super(GameIndexPage, self).get_context(request)

        # GamePage objects (get_games) are passed through pagination
        games = self.paginate(request, self.get_games())

        context['games'] = games

        return context

    class Meta:
        verbose_name = "Game Index Page"
        verbose_name_plural = "Game Index Pages"
