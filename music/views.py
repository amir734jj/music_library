from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers

from .models import Music

# Create your views here.
from django.http import HttpResponse


def index(request):
    if request.method == "POST":
        music = Music(name=request.POST["name"], url=request.POST["url"])
        music.save()
        return HttpResponse("Created!")
    else:
        return HttpResponse("Hello, world. You're at the polls index.")    

def get_all_music(request):
    return JsonResponse(list(Music.objects.all().values()), safe=False)