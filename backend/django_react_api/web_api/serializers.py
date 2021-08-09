"""
[TODO] Add proper docstring
"""
# pylint: disable=inconsistent-return-statements, missing-class-docstring, invalid-name
from rest_framework import serializers
from .models import Game, Section, Image


class ImageSerializer(serializers.ModelSerializer):
	section = serializers.StringRelatedField(read_only=True)

	class Meta:
		model = Image
		fields = ('id', 'header', 'alt_text', 'link', 'section')


class SectionSerializer(serializers.ModelSerializer):
	game = serializers.StringRelatedField(read_only=True)
	images = ImageSerializer(many=True, read_only=True)

	class Meta:
		model = Section
		fields = ('id', 'game', 'order', 'header', 'body', 'images')


class GameSerializer(serializers.ModelSerializer):
	sections = SectionSerializer(many=True, read_only=True)

	class Meta:
		model = Game
		fields = ('id', 'title', 'sections')
