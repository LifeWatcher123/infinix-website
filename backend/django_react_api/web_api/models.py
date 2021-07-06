from django.db import models

# Models for individual webpages' contents
class Game(models.Model):
	title = models.CharField(max_length=50)  

	def __str__(self):
		return self.title

class Section(models.Model):
	order = models.IntegerField()
	header = models.CharField(max_length=250)
	body = models.TextField()
	
	game = models.ForeignKey(Game, on_delete=models.CASCADE)
	
	def __str__(self):
		return self.header
		
class Image(models.Model):
	alt_text = models.CharField(max_length=250)
	link = models.CharField(max_length=250)
	
	section = models.ForeignKey(Section, on_delete=models.CASCADE)
	
	def __str__(self):
		return self.alt_text 