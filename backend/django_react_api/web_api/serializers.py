from rest_framework import serializers
from .models import Game, Section, Image

class GameSerializer(serializers.ModelSerializer):

    sections = serializers.RelatedField(many = True, read_only=True)
    class Meta:
        model = Game
        fields = ('pk', 'title', 'sections')

class SectionSerializer(serializers.ModelSerializer):
    game = serializers.RelatedField(read_only=True)
    images = serializers.RelatedField(many = True, read_only=True)

    class Meta:
        model = Section
        fields = ('pk', 'game', 'order', 'header', 'body', 'images')

class ImageSerializer(serializers.ModelSerializer):
    section = serializers.RelatedField(read_only=True)

    class Meta:
        model = Game
        fields = ('pk', 'header', 'alt_text', 'link', 'section')