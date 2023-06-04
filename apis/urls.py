from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("configs/", views.configs, name='configs'),
    path("config/<str:name>/", views.config, name='config'),
    # path("/page", views.PageView, name='page'),
    # path("/comment", views.CommentView, name='comment')
]
