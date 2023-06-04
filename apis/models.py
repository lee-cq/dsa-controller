# coding: utf8
from django.db import models


class Base:
    @classmethod
    def create(cls, **kwargs):
        return cls(**kwargs)


class Config(models.Model):
    """配置"""
    TYPES = [
        ('RSS', 'RSS'),
        ('alerts', 'Google Alerts'),
        ('oa', 'Official Accounts'),
        ('sc', 'Self Config')
    ]
    id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, null=False, max_length=128, help_text='配置名称')
    type = models.CharField(max_length=32, choices=TYPES, help_text='配置类型')
    link = models.CharField(max_length=256, help_text='新闻列表页面')
    selector_list = models.CharField(null=True, max_length=512, help_text='新闻列表选择器')
    selector_page = models.CharField(null=True, max_length=512, help_text='新闻内容选择器')
    tags = models.JSONField(default=list, help_text='标签')
    comments = models.CharField(default='', max_length=512, help_text='注释')
    update_time = models.DateTimeField(help_text='更新时间')

    def __str__(self):
        return f'爬取配置项：{self.type}-{self.name}'

    def __repr__(self):
        return f'爬取配置项：{self.type}-{self.name}'


class Page(models.Model):
    """页面"""
    STATUSES = [
        ''
    ]
    id = models.AutoField(primary_key=True)
    page_id = models.CharField(max_length=32, help_text='md5(source+title+link)')
    source = models.ForeignKey(Config, on_delete=models.CASCADE, help_text='数据来源')
    title = models.CharField(max_length=512, help_text='标题')
    link = models.CharField(max_length=256, unique=True, help_text='文章原文链接')
    text = models.TextField(null=True, help_text='文章原文')
    tags = models.JSONField(default=list, help_text='标签')
    keywords = models.JSONField(default=list, help_text='关键字提取')
    screenshot = models.BinaryField(null=True, help_text='屏幕快照')
    comments = models.CharField(max_length=512, help_text='评论或注解（暂定）')
    page_time = models.DateTimeField(null=True, help_text='文章发布时间')
    update_time = models.DateTimeField(null=True, help_text='抓取时间')
    status = models.CharField(max_length=32, help_text='状态')
    # 其他界面预留状态列
    github_discussion_id = models.CharField(null=True, max_length=64, help_text='')
    hugo_page_name = models.CharField(null=True, max_length=128)

    def __str__(self):
        return f'页面：{self.source.name}-{self.title}-{self.status}'


class SprLogs(models.Model):
    """爬取器状态"""
    id = models.AutoField(primary_key=True)
    source = models.ForeignKey(Config, on_delete=models.CASCADE, help_text='数据来源')
    status = models.CharField(max_length=32, help_text='状态')
    start_time = models.DateTimeField(help_text='开始时间')
    end_time = models.DateTimeField(help_text='结束时间')

    log_filename = models.CharField(help_text='日志文件名', max_length=128)
    comments = models.CharField(help_text='注释', max_length=512)

    def __str__(self):
        return f'爬取器状态：{self.source.name}-{self.status}'


class Comments(models.Model):
    """评论系统 TODO 对新闻进行评论、查找  """
    id = models.AutoField(primary_key=True)
    # page = models.ForeignKey(Page, on_delete=models.CASCADE, help_text='评论的页面')
    reply_id = models.CharField(max_length=32, help_text='回复的评论id')
    user = models.CharField(max_length=32, help_text='评论用户')
    content = models.CharField(max_length=512, help_text='评论内容')
    comments = models.CharField(max_length=512, help_text='注释')
    create_time = models.DateTimeField(help_text='创建时间')
    update_time = models.DateTimeField(help_text='更新时间')

    # def __str__(self):
    #     return f'评论：{self.page.title}-{self.user}-{self.content}'
