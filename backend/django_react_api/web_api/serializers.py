"""
Serializer(`django-rest-framework`) configuration for Django models.
Wagtail Page models have their own built-in serializers, so there is no
implementation in here.

For reference, see:
https://docs.wagtail.io/en/stable/advanced_topics/api/v2/configuration.html#custom-serialisers

"""
from rest_framework import serializers
from blog.models import GameBlogPage, GameIndexPage
from .models import Game
from .fields import GameField


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id', 'title')


class GameBlogPageSerializer(serializers.ModelSerializer):
    game = GameField()

    class Meta:
        model = GameBlogPage
        fields = ('__all__')


class GameIndexPageSerializer(serializers.ModelSerializer):

    class Meta:
        model = GameIndexPage
        fields = ('__all__')

    def get_children(self, instance):
        return "test data"
