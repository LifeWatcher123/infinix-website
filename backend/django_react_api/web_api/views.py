"""
[TODO] Add proper docstring
"""
# pylint: disable=inconsistent-return-statements, missing-function-docstring, invalid-name
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Game, Image, Section
from .serializers import *


@api_view(['GET', 'POST'])
def games_list(request):
	if request.method == 'GET':
		data = Game.objects.all()

		serializer = GameSerializer(
			data, context={'request': request}, many=True)

		return Response(serializer.data)

	elif request.method == 'POST':
		serializer = GameSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_201_CREATED)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def game_detail(request, pk):
	try:
		game = Game.objects.get(pk=pk)
	except Game.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)

	if request.method == 'PUT':
		serializer = GameSerializer(
			game, data=request.data, context={'request': request})
		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_204_NO_CONTENT)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	elif request.method == 'DELETE':
		game.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def sections_list(request):
	if request.method == 'GET':
		data = Section.objects.all()

		serializer = SectionSerializer(
			data, context={'request': request}, many=True)

		return Response(serializer.data)

	elif request.method == 'POST':
		serializer = SectionSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_201_CREATED)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def section_detail(request, pk):
	try:
		section = Section.objects.get(pk=pk)
	except Section.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)

	if request.method == 'PUT':
		serializer = SectionSerializer(
			section, data=request.data, context={'request': request})
		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_204_NO_CONTENT)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	elif request.method == 'DELETE':
		section.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
