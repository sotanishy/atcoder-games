# Generated by Django 3.0.5 on 2020-04-12 04:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0004_remove_problem_author'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Problem',
            new_name='Game',
        ),
    ]