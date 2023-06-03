# coding: utf8
"""page Config Views

配置的增删改查

"""

from django import forms
from django.views import View
from django.http import JsonResponse

from ..models import Config


class ConfigForm(forms.Form):
    name = forms.CharField()
    message = forms.CharField(widget=forms.Textarea)


def configs(request):
    """查询全部的config名称"""


class ConfigViews(View):
    """配置视图 - 
    
    用于管理和查找配置
    """
    model = Config

    def get(self, request, *args, **kwargs):
        """查询"""

    def post(self, request, *args, **kwargs):
        """新增"""
    
    def put(self, request, *args, **kwargs):
        """更新"""
    
    def del_(self, request, *args, **kwargs):
        """删除"""
