# coding: utf-8

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.generic import ListView, View
from django.shortcuts import get_object_or_404

from ..models import *

from .config import config, configs
from .page import page, pages

__all__ = ['index', 'config', 'configs', 'page', 'pages']


def index(request):
    return HttpResponse("Hello, world. You're at the apis index.")
