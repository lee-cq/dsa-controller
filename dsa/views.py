import json
from pathlib import Path

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.http import HttpResponse


def index(request):
    return HttpResponse("ok")


def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        # 与数据库中的用户名和密码比对，django默认保存密码是以哈希形式存储，并不是明文密码，这里的password验证默认调用的是User类的check_password方法，以哈希值比较。
        user = authenticate(request, username=username, password=password)
        # 验证如果用户不为空
        if user is not None:
            # login方法登录
            login(request, user)
            # 返回登录成功信息
            return HttpResponse('success')
        else:
            # 返回登录失败信息
            return HttpResponse('login failed')
    return render(request, 'sign_in.html')


# @login_required()
def logout_view(request):
    logout(request)
    return redirect("/login")

# @login_required()
def search(request):
    """"""
    return render(request, 'search.html')


def result_json(request):
    """"""
    _all = Path(__file__).parent.parent.joinpath('dist/all.json')

    _res = [{
        "title": i.get(),
        "permalink": i.get(),
        "content": i.get(),
        "date": i.get()
    } for i in json.loads(_all.read_text(encoding='utf8'))]


    return HttpResponse(json.dumps(_res))


def all_tags(request):
    """列出全部的Tag"""


def all_keywords(request):
    """列出全部的 关键字"""


def page_create(request):
    """创建一篇文章(POST)"""


def page_update(request):
    """更新一篇文章(PUT)"""


def page_get(request):
    """查询文章， 关键字，tag，keyword(GET)"""
