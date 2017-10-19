from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Music(models.Model):
    name = models.CharField(max_length=200)
    url = models.CharField(max_length=200)
    
    def __str__(self):
        return "name: {0}, url: {1}".format(self.name, self.url)
