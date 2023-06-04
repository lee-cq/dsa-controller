#!/usr/bin/python3
# -*- coding: utf-8 -*-
"""
@File Name  : page.py
@Author     : LeeCQ
@Date-Time  : 2023/6/4 13:58
"""

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.generic import ListView, View
from django.shortcuts import get_object_or_404

from ..models import Page


def pages(request):
    page_list = Page.objects.all()
    return render(request, 'apis/pages.html', {'page_list': page_list})


def page(request, page_id):
    _actions = {
        'GET': page_get,
        'POST': page_post,
        'PUT': page_put,
        'DELETE': page_delete,
    }
    return _actions[request.method](request, page_id)


def page_get(request, page_id):
    _page = get_object_or_404(Page, pk=page_id)
    return JsonResponse({'page': _page})


def page_post(request, page_id):
    _page = get_object_or_404(Page, pk=page_id)
    return JsonResponse({'page': _page})


def page_put(request, page_id):
    _page = get_object_or_404(Page, pk=page_id)
    return JsonResponse({'page': _page})


def page_delete(request, page_id):
    _page = get_object_or_404(Page, pk=page_id)
    return JsonResponse({'page': _page})
