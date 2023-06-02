# coding: utf8
"""page Config Views

配置的增删改查

"""

from django import forms


class ConfigForm(forms.Form):
    name = forms.CharField()
    message = forms.CharField(widget=forms.Textarea)
