# Generated by Django 3.0.5 on 2020-04-12 07:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0007_auto_20200412_1619'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='game',
            name='attempt_count',
        ),
    ]
