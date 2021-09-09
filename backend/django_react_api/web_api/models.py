"""
Django models that isn't a Wagtail Page
"""
from django.db import models

# Wagtail-specific model fields and admin editing integration dependencies.
from wagtail.admin.edit_handlers import (
    FieldPanel, MultiFieldPanel
)
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.models import register_snippet


@register_snippet
class BlogAuthor(models.Model):
    """Blog author for snippets."""

    name = models.CharField(max_length=100)
    website = models.URLField(blank=True, null=True)
    image = models.ForeignKey(
        "wagtailimages.Image",
        on_delete=models.SET_NULL,
        null=True,
        blank=False,
        related_name="+",
    )

    panels = [
        MultiFieldPanel(
            [
                FieldPanel("name"),
                ImageChooserPanel("image"),
            ],
            heading="Name and Image",
        ),
        MultiFieldPanel(
            [
                FieldPanel("website"),
            ],
            heading="Links"
        )
    ]

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Blog Author"
        verbose_name_plural = "Blog Authors"


@register_snippet
class Game(models.Model):
    """ Defines the Game database model. """
    title = models.CharField(max_length=150)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Games"
