""" TODO Provide docstring """
from django.db import models

class Game(models.Model):
	""" Defines the Game database model """
	title = models.CharField(max_length=50)

	def __str__(self):
		return self.title

class Section(models.Model):
	"""
	Defines the Section database model;
	'order' defines which section comes first,
	'header' defines each sections' header,
	'body' defines the content of the header, and
	'game' defines the 'Game' db object related to the 'Section'.
	"""
	order = models.IntegerField()
	header = models.CharField(max_length=250)
	body = models.TextField()

	game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='sections')

	def __str__(self):
		return self.header

class Image(models.Model):
	"""
	Defines the 'Image' database model;
	'alt_text' defines the text showing in the absence of the image,
	'link' defines the link to the image, and
	'section' defines the 'Section' db object related to the 'Section'.
	"""
	alt_text = models.CharField(max_length=250)
	link = models.CharField(max_length=250)

	section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='images')

	def __str__(self):
		return self.alt_text
