from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers

from .models import Music

# Create your views here.
from django.http import HttpResponse

def index(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    return render(request, "index.html");
    
def get_all_music(request):
    if request.method == "POST" and "name" in request.POST and "url" in request.POST:
        music = Music(name=request.POST["name"], url=request.POST["url"])
        music.save()
        return HttpResponse("Created!")
    else:
        return JsonResponse(list(Music.objects.all().values()), safe=False)

def remove_music(request, id):
    id_val = id
    if Music.objects.filter(id=id_val).exists():
        instance = Music.objects.get(id=id_val)
        instance.delete()
        return HttpResponse("Deleted!")
    else:
        return HttpResponse("Item not found!")