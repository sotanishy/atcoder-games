from django.urls import path

from . import views

app_name = 'games'
urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('announcements/', views.AnnouncementsView.as_view(), name='announcements'),
    path('list/', views.GameListView.as_view(), name='list'),
    path('<str:problem_id>/', views.detail, name='detail'),
]