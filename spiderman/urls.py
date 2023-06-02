from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('/config', views.ConfigViews.as_view(), name='config'),
    path('/page', views.page, name='page'),
    path('/comment', views.comment, name='comment')
]