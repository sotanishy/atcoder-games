# Generated by Django 3.0.5 on 2020-04-16 05:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0011_game_how_to_play'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='game',
            name='problem_statement',
        ),
    ]
