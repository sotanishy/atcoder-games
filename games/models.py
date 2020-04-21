from django.db import models

class Game(models.Model):
    problem_id = models.CharField(max_length=200)
    contest_id = models.CharField(max_length=200)
    date_added = models.DateTimeField()
    title = models.CharField(max_length=200)
    contest = models.CharField(max_length=200)
    how_to_play = models.TextField()

    def __str__(self):
        return self.title

class Announcement(models.Model):
    message = models.CharField(max_length=64, blank=True)
    date = models.DateTimeField()

    def __str__(self):
        return self.message
