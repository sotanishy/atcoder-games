from django.shortcuts import get_object_or_404, render
from django.views import generic

from .models import Announcement, Game

class AnnouncementsView(generic.ListView):
    template_name = 'games/announcements.html'
    context_object_name = 'announcement_list'

    def get_queryset(self):
        return Announcement.objects.order_by('-date')

class GameListView(generic.ListView):
    template_name = 'games/list.html'
    context_object_name = 'game_list'

    def get_queryset(self):
        return Game.objects.all()

def index(request):
    recent_announcement_list = Announcement.objects.order_by('-date')[:5]
    game_list = Game.objects.order_by('-date_added')[:5]
    context = {
        'recent_announcement_list': recent_announcement_list,
        'game_list': game_list,
    }
    return render(request, 'games/index.html', context)

def about(request):
    return render(request, 'games/about.html')

def detail(request, problem_id):
    game = get_object_or_404(Game, problem_id=problem_id)
    context = {
        'game': game,
    }
    return render(request, 'games/detail.html', context)