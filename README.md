# DSA Controller
## Description
DSA 控制器是一个基于 [Django](https://www.djangoproject.com/) 的 Web 应用程序，用于管理和可视化查看DSA爬取器的项目。

## Features
1. DSA配置
2. 文章结果展示和搜索
3. 文章内容推送

## Installation
1. 安装Python3.6+和pip
2. 安装依赖
```bash
pip install -r requirements.txt
```
3. 迁移数据库
```bash
python manage.py migrate
```
4. 创建管理员账户
```bash
python manage.py createsuperuser
```
5. 运行
```bash
python manage.py runserver
```

## Usage
1. 访问 http://localhost:8000/admin/ ，使用第4步创建的管理员账户登录
2. 在DSA配置中添加DSA爬取器的项目
3. 在文章中查看爬取结果
4. 在推送中推送文章内容
5. 在推送记录中查看推送结果

## License
[MIT]()

