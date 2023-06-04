# coding: utf8
"""page Config Views

配置的增删改查

"""
import json
import time

from django import forms
from django.views import View
from django.views.decorators.http import require_safe, require_http_methods
from django.http import JsonResponse, HttpRequest

from ..models import Config


class ConfigForm(forms.Form):
    name = forms.CharField()
    message = forms.CharField(widget=forms.Textarea)


@require_safe
def configs(request: HttpRequest):
    """查询全部的config名称"""
    return JsonResponse(list(Config.objects.all().values_list('name', flat=True)), safe=False)


@require_http_methods(['GET', 'POST', 'PUT', 'DELETE'])
def config(request: HttpRequest, name):
    """config"""
    _actions = {
        'GET': config_get,
        'POST': config_post,
        'PUT': config_put,
        'DELETE': config_del
    }
    return _actions[request.method](request, name)


def config_get(request, name):
    """查询config"""


def config_post(request, name):
    """新增config"""

    body = json.loads(request.body)

    if name != body['name']:
        return JsonResponse({
            'status': 1,
            'message': 'name is not equal'
        })

    _config = Config(**body)
    _config.update_time = time.strftime('%Y-%m-%d %H:%M:%S')
    _config.save()
    return JsonResponse({
        'status': 0,
        'message': 'success'
    })


def config_put(request, name):
    """更新config"""


def config_del(request, name):
    """删除config"""


class ConfigViews(View):
    """配置视图 -

    用于管理和查找配置
    """
    model = Config

    def get(self, request, *args, **kwargs):
        """查询"""
        self.model.objects.filter(name='test').all()

    def post(self, request, *args, **kwargs):
        """新增"""

    def put(self, request, *args, **kwargs):
        """更新"""

    def del_(self, request, *args, **kwargs):
        """删除"""
