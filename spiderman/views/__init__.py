from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.generic import ListView, View
from django.shortcuts import get_object_or_404

from ..models import *

__all__ = ['index', 'ConfigViews', 'page', 'comment']


def index(request):
    return HttpResponse("Hello, world. You're at the spiderman index.")


class ConfigViews(ListView):
    model = Config

    def get_queryset(self):
        self.publisher = get_object_or_404(Config, name=self.kwargs['publisher'])
        return Config.objects.filter(publisher=self.publisher)

    def get(self, request, *args, **kwargs):
        """"""


class Page(View):
    """"""


def page():
    """页面增删改查"""


def comment():
    """评论操作"""
