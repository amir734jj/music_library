from __future__ import unicode_literals

from django.db import models
from
# Create your models here.

class Music(models.Model):
    name = models.CharField(max_length=200)
    url = models.CharField(max_length=200)