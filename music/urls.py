from django.conf.urls import url
from django.conf import settings

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^music/$', views.get_all_music, name='get all music'),
    url('^music/delete/(?P<id>[0-9]+)$', views.remove_music, name="remove music")
]