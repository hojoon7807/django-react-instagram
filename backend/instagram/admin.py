from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Post, Comment, Tag
# Register your models here.


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['photo_tag', 'caption']
    list_display_links = ['caption']

    def photo_tag(self, post):
        # mark_safe는 제한적으로 안전하다 생각될때만 사용해야된다.
        return mark_safe(f"<img src={post.photo.url} style='width:100px' />")


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass
