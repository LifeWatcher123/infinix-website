"""
Django Models representing the Home Landing Page data.

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

# Wagtail-specific model fields and admin editing integration dependencies.
from modelcluster.fields import ParentalKey
from wagtail.core.models import Page, Orderable
from wagtail.contrib.routable_page.models import RoutablePageMixin
from wagtail.core.fields import RichTextField
from wagtail.api import APIField
from wagtail.admin.edit_handlers import (
    FieldPanel, MultiFieldPanel, InlinePanel, PageChooserPanel
)
from wagtail.images.edit_handlers import ImageChooserPanel


class AlbumItems(Orderable):
    """Album Item representation for the home landing page's album section"""

    root_page = ParentalKey(
        'home.HomePage',
        related_name='album_images'
    )
    linked_page = models.OneToOneField(
        'blog.GameBlogPage',
        on_delete=models.CASCADE,
        related_name='+'
    )
    image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    @property
    def intro(self):
        """ Adding property from foreign GameBlogPage table. """
        return self.linked_page.introduction

    panels = [
        ImageChooserPanel('image'),
        PageChooserPanel('linked_page')
    ]

    api_fields = [
        APIField('intro'),
        APIField('image'),
        APIField('linked_page'),
    ]


class HomePage(RoutablePageMixin, Page):
    """Home Page model."""
    subpage_types = [
        'blog.GameIndexPage',
        # 'web_api.ContactPage'
    ]
    parent_page_type = [
        'wagtailcore.Page'
    ]

    banner_title = models.CharField(max_length=100, blank=False, null=True)
    banner_subtitle = RichTextField(features=["bold", "italic"])
    banner_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    banner_cta_link_url = models.URLField(
        max_length=500,
        blank=True,
        help_text="Leave empty if link leads to one of this site's pages."
    )
    banner_cta_link_page = models.ForeignKey(
        "wagtailcore.Page",
        null=True,
        blank=True,
        related_name="+",
        on_delete=models.SET_NULL,
    )
    banner_cta_text = models.TextField()

    content_panels = Page.content_panels + [
        FieldPanel('banner_title'),
        FieldPanel('banner_subtitle'),
        ImageChooserPanel('banner_image'),
        FieldPanel('banner_cta_text'),
        FieldPanel('banner_cta_link_url'),
        PageChooserPanel('banner_cta_link_page'),
        MultiFieldPanel(
            [
                InlinePanel("album_images", label="Album Image",
                            min_num=1, max_num=4)
            ],
            heading="Album Image(s)", help_text='Determines what Album items are shown.'
        ),
    ]

    api_fields = [
        APIField('banner_title'),
        APIField('banner_subtitle'),
        APIField('banner_image'),
        APIField('banner_cta_link_url'),
        APIField('banner_cta_link_page'),
        APIField('banner_cta_text'),
        APIField('album_images'),
    ]

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Home Page"
        verbose_name_plural = "Home Pages"
