from rest_framework import serializers
from rest_framework.fields import DateTimeField


class ImageSerializedField(serializers.Field):
    """A custom image serializer to simplify Wagtail's Image model."""

    def to_representation(self, value):
        """Return the image URL, title and dimensions."""
        return {
            "url": value.file.url,
            "title": value.title,
            "width": value.width,
            "height": value.height,
        }


class GameBlogPageField(serializers.Field):
    """
    TODO Try to nest serializer fields.

    A custom serializer for blog.GameBlogPage.

    Takes into account that this processes a QuerySet from Wagtail,
    as that is what the methods in models.py return. Thus, iteration
    is needed. For more information, please refer to:

    https://docs.wagtail.io/en/stable/getting_started/tutorial.html#parents-and-children
    https://learnwagtail.com/tutorials/headless-cms-serializing-child-pages-and-querysets/
    """

    def to_representation(self, queryset):
        """
        Return a list of JSON objects representing the game blog pages.

        There is an ongoing problem where I haven't yet figured out how to serialize objects deeper.
        For more information, see:
        https://stackoverflow.com/questions/68922440/defining-a-custom-serializer-field-for-related-models-gives-typeerror#comment121821651_68922440
        """
        pages = []
        for child in queryset:

            album_image = ImageSerializedField.to_representation(self, child.album_image)
            published_date = DateTimeField(
                format='%B %Y').to_representation(child.published_date)
            post_dict = {
                "id": child.id,
                "title": child.title,
                "published_date": published_date,
                "album_image": album_image,
            }
            pages.append(post_dict)
        return pages


''' Previously used to test nested serializing
class GameField(serializers.Field):

    def to_representation(self, value):
        return {
            "id": "test"
        }
'''
