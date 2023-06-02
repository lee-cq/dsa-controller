from django.db import models


class Config(models.Model):
    """配置"""
    id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, null=False, max_length=128, db_comment='配置名称')
    link = models.CharField(max_length=256, db_comment='新闻列表页面')
    selector_list = models.CharField(null=True, max_length=512, db_comment='新闻列表选择器')
    selector_page = models.CharField(null=True, max_length=512, db_comment='新闻内容选择器')
    tags = models.JSONField(default=list, db_comment='标签')
    comments = models.CharField(max_length=512, db_comment='注释')
    update_time = models.DateTimeField(db_comment='更新时间')


class Page(models.Model):
    """页面"""
    id = models.AutoField(primary_key=True)
    page_id = models.CharField(max_length=32, db_comment='md5(source+title+link)')
    source = models.ForeignKey(Config, on_delete=models.CASCADE, db_comment='数据来源')
    title = models.CharField(max_length=512, db_comment='标题')
    link = models.CharField(max_length=256, unique=True,db_comment='文章原文链接')
    text = models.TextField(null=True, db_comment='文章原文')
    tags = models.JSONField(default=list, db_comment='标签')
    keywords = models.JSONField(default=list, db_comment='关键字提取')
    screenshot = models.BinaryField(null=True, db_comment='屏幕快照')
    comments = models.CharField(max_length=512, db_comment='评论或注解（暂定）')
    page_time = models.DateTimeField(null=True, db_comment='文章发布时间')
    update_time = models.DateTimeField(null=True, db_comment='抓取时间')
    # 其他界面预留状态列
    github_discussion_id = models.CharField(null=True, max_length=64,db_comment='')
    hugo_page_name = models.CharField(null=True,max_length=128)


class SprLogs(models.Model):
    """爬取器状态"""



# class comments(models.Model):
#     """评论系统 TODO 对新闻进行评论、查找  """
