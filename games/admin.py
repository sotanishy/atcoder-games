from django.contrib import admin

from .models import Announcement, Game

admin.site.register(Announcement)
admin.site.register(Game)